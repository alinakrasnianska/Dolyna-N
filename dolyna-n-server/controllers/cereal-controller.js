const db = require('../database/db')
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const upload = multer();

class cerealController {
   async createCereal(req, res) {
      upload.single('image')(req, res, async function (err) {
         if (err) {
            console.error('Upload error:', err);
            return res.status(500).json({ error: 'Upload error' });
         }

         const { name_ua, name_en, description_ua, description_en } = req.body;
         const { originalname, mimetype, buffer } = req.file;
         console.log(name_ua, description_ua, originalname);
         try {
            const imgFolderPath = path.join(__dirname, '..', 'img');
            if (!fs.existsSync(imgFolderPath)) {
               fs.mkdirSync(imgFolderPath);
            }

            const imagePath = path.join(imgFolderPath, originalname);
            await fs.promises.writeFile(imagePath, buffer);

            const imageUrl = `/img/${originalname}`;
            const cereal = await db.query('INSERT INTO cereals (name_ua,name_en, description_ua,description_en, image) VALUES ($1, $2, $3 ,$4,$5) RETURNING *', [name_ua, name_en, description_ua, description_en, imageUrl]);

            console.log(`${cereal.rows[0].name} додано до списку продуктів`)
         } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({ error: 'Database error' });
         }

         res.json({ message: "success" });
      });
   }

   async getCereals(req, res) {
      try {
         const query = 'SELECT * FROM cereals';
         const result = await db.query(query);

         const cerealsWithImageUrls = result.rows.map(cereal => {
            return {
               id: cereal._id,
               name_ua: cereal.name_ua,
               name_en: cereal.name_en,
               description_ua: cereal.description_ua,
               description_en: cereal.description_en,
               imageUrl: `${req.protocol}://${req.get('host')}${cereal.image}`
            };
         });

         res.json({ cereals: cerealsWithImageUrls });
      } catch (error) {
         console.error('Database error:', error);
         res.status(500).json({ error: 'Database error' });
      }
   }
}



module.exports = new cerealController();   