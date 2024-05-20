const FormRouter = require('./default')
const FormController = require('../controllers/form-controller');


FormRouter.post('/contactUsData',FormController.contact_us)


module.exports = FormRouter;   