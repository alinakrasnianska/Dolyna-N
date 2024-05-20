const usersRouter = require('./default')
const userController = require('../controllers/user-controller')

usersRouter.post('/createUser',userController.createUser)
usersRouter.get('/getUser',userController.getUser)
usersRouter.put('/updateUser',userController.updateUser)
usersRouter.delete('/deleteUser/:id',userController.deleteUser)
usersRouter.post('/authorizeUser',userController.loginUser)


module.exports = usersRouter;