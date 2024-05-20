const cerealRouter = require('./default')
const cerealController = require('../controllers/cereal-controller')


cerealRouter.post('/createCereal',cerealController.createCereal)
cerealRouter.get('/getCereals',cerealController.getCereals)



module.exports = cerealRouter;   