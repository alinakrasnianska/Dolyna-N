const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const db = require('../database/db')
const userValidator = require('../validators/userValidators')
const Generator = require('../modules/generatelink')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { DOLYNAKEY } = require('../config')
const Password = require('../validators/passwordValidator')

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

const OAuth2 = google.auth.OAuth2;

const us = "dolynan.grainsupplier@gmail.com"

const oauth2Client = new OAuth2(
   '525921555438-6onerkpkcb5h92920r2qrcelctofim2n.apps.googleusercontent.com',
   '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',
   'https://developers.google.com/oauthplayground'
);
 
oauth2Client.setCredentials({  
   refresh_token: '1//040PhZvHlX7anCgYIARAAGAQSNwF-L9IrVyM08mE0t4z4nX5SwXNATSVjKmIDBRJAxzXLQsS34ora7EEAC2zlcxC7CQLd8Q0w4tU' 
});


const accessToken = oauth2Client.getAccessToken()

let transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: { 
      type: 'OAuth2',
      user: us,
      clientId: '525921555438-6onerkpkcb5h92920r2qrcelctofim2n.apps.googleusercontent.com ',
      clientSecret: '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',
      refreshToken: '1//040PhZvHlX7anCgYIARAAGAQSNwF-L9IrVyM08mE0t4z4nX5SwXNATSVjKmIDBRJAxzXLQsS34ora7EEAC2zlcxC7CQLd8Q0w4tU',
      accessToken: accessToken
   },
});


 



class RecoverConroller {
   recoverPass = async (req, res) => {
      const { email } = req.body;

      const new_email = userValidator.emailValidator(email)
      const existingUser = await db.query('SELECT * FROM users WHERE user_email = $1', [new_email]);


      if (existingUser.rows.length > 0) {
         const magic = Generator.magicLink(existingUser.rows[0])

         const htmlString = `<!DOCTYPE html>
         <html lang="en">
         
         <head>
            <title>Password Recover</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Jura:wght@300..700&display=swap" rel="stylesheet">
         </head>
         
         <body style="width: 600px;margin: 0;">
            <header style="width: 100%; height: 83px;box-sizing: border-box; padding: 10px 0 0 190px; ">
               <img style="width: 200px;"
                  src='https://lh3.googleusercontent.com/fife/ALs6j_G2zdGfD8yI98EsJTucVJpo7wAO_ppYeN8aJo9lqbQZGrwcOk64eXE8y4Rfv3qwodu_swkKwhaQm1J1Y8k43SCuzozTMHxcBDCY44H5r9nijM39W2QdeXGKW4SAXqHrH31X0wPWtTPUmyrQHabh_1Dw6YRMuTFBmrffAzqlegvaucicPMQBRfE7tESnpfKSsJsDVFnYFR7ZH8jZjZHmG_09P4QIa7DJz-_FY-6tCmdlwIyMVa-R6ub-1iDIzPgSR55Klix5RyiNkkU4p1eMOTmN9oTrmWxns_AJnwk5dkGrjqJu9Q4v9Rh2t9uST0utBTu-YFMBUgcE5_jymG-QXt_XGn7reF6xyUJZeYYBRYQ0iKNj7VDYToBHkfdhf7GpeakiD11Isb-IX6PgUx3j9lUeJNcKWInhO8pWJVmltMt6A8mYej1p9aKds8GrUzf6Pjk4CCL-0JwdOULPzNou0qSao42bn3BhtiPYBwkNuFneCN8RSGuzMSAL-G5d6JMKUKifCsB3nRwJ7c4aic8JBwhAdHDEzIIDtH9-9OeuzA5YVlId3Bt737ksReuWv56zpCqY58Ccmad0TgIVqBA4inV65CTmMhOOVbxVmnc2JhPY12QGEWsRCy5GmOG9bDU5oQUR885M1Pn6HVsueMM2h5S71xcVcXVIL4Y99_7KXhCeJqG5wWu6q3aAJHBe4EpsMje63Sq7k4v2Jm_msC_0ZC1JLrwjyemnk76MVmTM8pAc3p49bS-D8QE6enxyiNnoKp0IdbBMyRoIDMU9q-Iz9iyR7-bqbADQyC7ORmTXo3bvaBOVNTrKHEPB50FllHXdDBrBX8nzGgmYuhZ2iNvbM3-788NmSI8uRGmZzYSiEpmBBOVx8517CAd7Vgp6Hdm7_Pw0urEqcQXw8hPiaQsy74EIx6g1-_qco6OuawTkJrJdmaXoarsxvfOSsrgZuVnIzcqPKfD1hOvHaO9Clg320OC3FRW9uxfwHEwzW30FQUfmKbjsM2UHlL-vZYIsTWwmjqX6SWAAAhUlQYIjtaBSZbwKPxW6mZiqOk-QSs-7uLuys3_tXuB9bsoKVgscNkflAWPrMqiefhMD8jgKDP67B38ImgvUiYX51NgQpNNCZpw2wV-qoFxy7TVaa17d4gXlNTRVYLAJucEsfkbh-62f8h9QF1wsf-Uz5CLw8rLjb7Lrbz2oM5tIfy3XafOVhsvZokIYGwNLMlfk8UW-yhp835tKdORxA7laksERKqYLooEToEr3EDIIOSvUUTEUxnmniLxVgu9_QI5zRk0hZWJUdqhc8qfONqfWaeQzmy3kX8jQ4I00NbRf9Pymcc-vO4iM00wwS60E5_dup0nVjwWbQXvAvzqVIOPOU7R2XZu5gFwjMRkHN-pDUAaEM59RqewsA4uvo8cTZ2IhiFTXMNQ-BvTXJmI6brR4oIrIqWSkF_XKZbJADOrUEEA7f4YRWUU4X2Ds7oVogToSEk5X1roTFGcb9Jz66j8N36Q5wZYzoWiSxR_nKnOGa8TBfUfn_9PCdrRs_CgteHrOXbBu9hFiY52Kumn-zlQomzIgKKXbaAX0j1gzRCY7c6asA0MOVfQbeRxnMHQH5iqhxtYX-tfa7_TAyBZrX9RyAYDZvBrAzfuTlQuBtAWz8zJVl_0W1QFj5_yrEMAo12TzSiaPpQmcAw4GWpvzfCJqZyGPXqyTOEEx8oTNICB_s0PiHnjwR_OqAqD3FgeEJabn9qRjMWvZq2A_zr5642caJxttJnAECN3noHdJk9FVl2Lgxt6bCQ=w1920-h957'
                  alt="dolyna-n">
            </header>
            <div style="width: 100%; height:2px; background: #D9D9D9;"></div>
            <main style="width: 100%;box-sizing: border-box; padding:37px 0 0 18px;">
               <div
                  style="color:#2A2C34; font-family: 'Jura', sans-serif; font-optical-sizing: auto; font-weight: 500; font-style: normal; font-size: 18px; line-height: 20px;  ">
                  Dear ${existingUser.rows[0].user_name},</div>
               <div style="height: 14px;"></div>
               <div
                  style="width: 94%; height:150px;background: #2A2C34; border-radius: 15px; box-sizing: border-box; padding:23px 15px 0 21px; color:#ffffff; font-family: 'Jura', sans-serif; font-optical-sizing: auto; font-weight: 500; font-style: normal; font-size: 16px; line-height: 18px; ">
                  We received a request to reset your password for your account
                  associated with this email address.
                  <br />
                  <br />
                  If you made this request, please follow the instructions below.
                  <br />
                  <br />
         
                  Click the link below to reset your password:
         
               </div>
               <div
                  style="color:#FFB75E; font-family: 'Jura', sans-serif; font-optical-sizing: auto; font-weight: 500; font-style: normal; font-size: 18px; line-height: 20px; padding:28px 0 28px 31px; ">
                  LINK:<a href='${magic}'> Click here
         
                  </a></div>
         
               <div
                  style="width: 94%; height:150px;background: #2A2C34; border-radius: 15px; box-sizing: border-box; padding:23px 15px 0 21px; color:#ffffff; font-family: 'Jura', sans-serif; font-optical-sizing: auto; font-weight: 500; font-style: normal; font-size: 16px; line-height: 18px; ">
         
                  If you did not request to have your password reset you can safely
                  ignore this email.
                  <br><br>
                  Rest assured your account is safe.
                  <br><br>
                  Best regards,
                  Dolyna-N
         
               </div>
         
            </main>
         </body>
         
         </html>`

         const mailOptions = {
            from: us,
            to: existingUser.rows[0].user_email,
            subject: 'Dolyna-N Password Recover',
            html: htmlString
         };
         transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
               console.log(error);
            } else {
               console.log('Email sent: ' + info.response);
               res.json({ message: 'Success' })
            }
         });
      } else {
         res.json({ "message": "Success" })
      }



   }
   decodeRecover = async (req, res) => {
      const { cypher } = req.body;
      const decypher = Generator.NotMagic(cypher)
      const user = await db.query('SELECT * FROM users WHERE user_email = $1', [decypher.email]);
      if (user.rows.length > 0) {
         if (user.rows[0].user_email === decypher.email) {
            if (user.rows[0].user_password === decypher.password) {
               let now = new Date();
               if (now < new Date(decypher.allowTo)) {

                  const new_email = decypher.email
                  const new_password = decypher.password
                  try {
                     const user = await db.query('SELECT * FROM users WHERE user_email = $1', [new_email]);
                     if (user.rows.length > 0) {
                        const userData = user.rows[0];
                        const hash = userData.user_password;
                        if (new_password === hash) {
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
               } else {
                  res.status(403).json({ message: '403 date is banned' })
               }
            }

         }

      } else {
         res.status(403).json({ message: '403 date is banned' })
      }

   }
   change_Password = async (req, res) => {
      const token = req.headers.authorization;
      if (!token) {
         return res.status(401).json({ error: 'Token is uncought' });
      } else {
         const { new_pass } = req.body
         try {
            const decoded = jwt.verify(token, DOLYNAKEY);
            const id = decoded.id;
            const email = decoded.email;
            if (Password.validate(new_pass)) {
               const hashPass = bcrypt.hashSync(new_pass, 9);
               const existingUser = await db.query('SELECT * FROM users WHERE user_email = $1', [email]);
               if (existingUser.rows[0]._id !== id) {
                  return res.status(400).json({ error: "Користувач з таким email не існує" });
               } else {
                  const user = await db.query('UPDATE users SET user_password = $1 WHERE _id = $2', [hashPass, id])
                  if (user) {
                     const userData = await db.query('SELECT * FROM users WHERE _id = $1', [id])
                     const token = generateToken(userData)
                     console.log(jwt.verify(token, DOLYNAKEY))
                     res.json({ token: token })

                  }

               }

            } else {
               res.status(401).json({ error: "Incorrect password" })
            }

         } catch (error) {
            res.status(500).json({ error: "500" + error })
         }
      }

   }
}

module.exports = new RecoverConroller();   