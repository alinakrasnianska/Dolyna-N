const adminRouter = require('./default')
const AdminController = require('../controllers/admin-controller')

adminRouter.post('/verify',AdminController.check_hash)

module.exports = adminRouter; 