const RecoverRouter = require('./default')
const RecoverConroller = require('../controllers/recover-controller')


RecoverRouter.post('/passrecover',RecoverConroller.recoverPass)
RecoverRouter.post('/setnewpass',RecoverConroller.decodeRecover)
RecoverRouter.put('/changepass',RecoverConroller.change_Password)




module.exports = RecoverRouter;   