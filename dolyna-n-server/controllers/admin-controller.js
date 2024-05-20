const {hashKey} = require('../adminconfig')
const bcrypt = require('bcryptjs')

class AdminController {
   async check_hash(req,res){
      const key = req.body.key

      const keyMatch = bcrypt.compareSync(key,hashKey)

      if(keyMatch){
         res.json({request:true})
      }else{
         res.json({request:false})
      }
   }

}

module.exports = new AdminController()