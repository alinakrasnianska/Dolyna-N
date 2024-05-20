const Pool = require('pg').Pool

const pool = new Pool({
   user: 'postgres',
   password: 'subDolyNna$uperU$er',
   port: 8090,
   database: 'dolynan',
   host: 'localhost' 
})


module.exports = pool 