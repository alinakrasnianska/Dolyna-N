const db = require('../database/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const userValidator = require('../validators/userValidators')
const { DOLYNAKEY } = require('../config')

const generateToken = (userData) => {
   const payload = {
      id: userData._id,
      name: userData.user_name,
      surname: userData.user_surname,
      email: userData.user_email,
      phone: userData.user_phone,
      company_name: userData.company_name,
      last_order: userData.last_order
   }

   return jwt.sign(payload, DOLYNAKEY, { expiresIn: "24h" })
}



class UserController {
   async createUser(req, res) {
      const { name, surname, password, email, phone, company_name, last_order } = req.body


      try {
         const new_email = userValidator.emailValidator(email)
         const { name: new_name, surname: new_surname, password: new_password, email: checked_email } = userValidator.anone(name, surname, password, new_email)

         if (new_email) {
            if (new_name, new_surname, new_password, checked_email) {
               const existingUser = await db.query('SELECT * FROM users WHERE user_email = $1', [new_email]);

               if (existingUser.rows.length > 0) {
                  return res.status(400).json({ error: 'Користувач з таким email вже зареєстрований' });
               } else {
                  const hashPass = bcrypt.hashSync(new_password, 9);
                  const new_User = await db.query('INSERT INTO users (user_name,user_surname,user_password,user_email,user_phone,company_name ,last_order) values ($1,$2,$3,$4,$5,$6,$7) RETURNING *', [new_name, new_surname, hashPass, checked_email, phone, company_name, last_order])

                  res.json(`користувача ${new_User.rows[0].user_name} створено`)
               }
            } else {
               res.status(403).json({ error: "некоректний ввід даних  " })
            }
         } else {
            res.status(403).json({ error: "перевірте ввід даних" })
         }

      } catch (error) {
         console.error('Помилка створення користувача', error);
         res.status(500).json({ error: 'error 500 : Помилка створення користувача' });
      }


   }
   async getUser(req, res) {
      const token = req.headers.authorization;

      if (!token) {
         return res.status(401).json({ error: 'Token is uncought' });
      }
      try {

         const decoded = jwt.verify(token, DOLYNAKEY);
         const userId = decoded.id;
         const user = await db.query('SELECT * FROM users WHERE _id = $1', [userId]);
         if (!user.rows[0]) {
            return res.status(404).json({ error: 'user is not exits' });
         } else {
            const token = generateToken(user.rows[0])
            res.json({ token: token });
         }

      } catch (error) {
         console.error('Ошибка:', error);
         res.status(500).json({ error: 'server error' });
      }
   }

   async updateUser(req, res) {
      const token = req.headers.authorization;
      if (!token) {
         return res.status(401).json({ error: 'Token is uncought' });
      }

      const { name, surname, phone, company_name, email } = req.body

      try {
         const decoded = jwt.verify(token, DOLYNAKEY);
         const id = decoded.id;
         if (userValidator.namesValidator(name, surname)) {
            if (userValidator.companyValidator(company_name)) {
               if (userValidator.phoneValidator(phone)) {
                  if (userValidator.emailValidator(email)) {
                     const existingUser = await db.query('SELECT * FROM users WHERE user_email = $1', [email]);

                     if (existingUser.rows[0]._id !== id) {
                        return res.status(400).json({ error: "Користувач з таким email вже існує"});
                     } else {
                        const user = await db.query('UPDATE users set user_name = $1 , user_surname = $2 , user_phone = $3 ,company_name = $4 , user_email = $5 WHERE _id = $6 RETURNING *', [name, surname, phone, company_name, email, id])
                        res.json(user)
                     }

                  } else {
                     res.status(400).json(`Incorrect email number`)
                  }
               } else {
                  res.status(400).json(`Incorrect phone number`)
               }
            } else {
               res.status(400).json(`Company name is not valid`)
            }
         } else {
            res.status(400).json(`Name/Surname incorrect input`)
         }
      } catch (error) {
         res.status(500).json(`Server error: ${error.message}`)
      }


   }

   async deleteUser(req, res) {
      const id = req.params.id
      const user = await db.query('DELETE FROM users WHERE _id = $1', [id])
      res.json(user.rows[0])
   }


   async loginUser(req, res) {
      const { email, password } = req.body;
      try {
         const user = await db.query('SELECT * FROM users WHERE user_email = $1', [email]);
         if (user.rows.length > 0) {
            const userData = user.rows[0];
            const hash = userData.user_password;
            const passwordMatches = bcrypt.compareSync(password, hash);
            if (passwordMatches) {
               const token = generateToken(userData)
               console.log(jwt.verify(token, DOLYNAKEY))
               res.json({ token: token });
            } else {
               res.status(401).json({ message: 'incorrect data entry' });
            }
         } else {
            res.status(401).json({ message: 'incorrect data entry' });
         } 
      } catch (error) {
         res.status(500).json({ message: 'Network error' });
      }
   }

}


module.exports = new UserController(); 