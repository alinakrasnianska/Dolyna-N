const express = require('express')


const defaul = require('./routes/default')
const usersRouter = require('./routes/user') 
const cerealRouter = require('./routes/cereal')
const adminRouter = require('./routes/admin')
const FormRouter = require('./routes/form')
const RecoverRouter = require('./routes/recover')
const QuoteRouter = require('./routes/quote')



const app = express()

app.use(express.json())

app.use('/img', express.static(__dirname + '/img'));

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); 
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   next();
 });


app.use('/',defaul) 
app.use('/users',usersRouter)
app.use('/cereals',cerealRouter) 
app.use('/admin',adminRouter)
app.use('/connect',FormRouter)
app.use('/recover',RecoverRouter)
app.use('/quote',QuoteRouter)


 



port = process.env.PORT || 8000 

 
const start = () => {
   try {
      app.listen(port, () => {
         console.log(`Success ${port}`)
       })  
   } catch (error) {
      console.log(e)
   }
}

start()
