const crypto = require('crypto');
const EC = require('elliptic').ec;
const ec = new EC('curve25519');

// Генерация ключей
const key = ec.genKeyPair();
const pubKey = key.getPublic('hex');
const privKey = key.getPrivate('hex');

class Generator {
   
   magicLink = (user) => {
      console.log(privKey)
      let now = new Date();
      let allowTo = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      const user_crypt = {
         email: user.user_email,
         password: user.user_password,
         allowTo: allowTo,
      }
      const cryptoJson = JSON.stringify(user_crypt)

      const cipher = crypto.createCipher('aes-256-cbc', privKey);
      let encrypted = cipher.update(cryptoJson, 'utf8', 'hex');
      encrypted += cipher.final('hex');
   
      const link = `http://localhost:3000/recover/${encodeURIComponent(encrypted)}`;

      return link;
   }
   NotMagic = (encrypted) => {
      try {
         const decipher = crypto.createDecipher('aes-256-cbc', privKey);
         let decrypted = decipher.update(encrypted, 'hex', 'utf8');
         decrypted += decipher.final('utf8');
   
         return JSON.parse(decrypted); 
         
      } catch (error) {
         return {error: 'incorrect'}
      }
    
   }
}

module.exports = new Generator();