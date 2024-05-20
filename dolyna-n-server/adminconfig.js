const bcrypt = require('bcryptjs')
const {DOLYNAKEY} = require('./config')

const hashKey = bcrypt.hashSync(DOLYNAKEY,12)
   
module.exports = {
   hashKey
}