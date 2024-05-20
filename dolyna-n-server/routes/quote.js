const QuoteRouter = require('./default')
const QuoteController = require('../controllers/quote-controller')

QuoteRouter.post('/requestaquote',QuoteController.req_quote)

module.exports = QuoteRouter; 