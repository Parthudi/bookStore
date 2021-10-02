const express = require('express')
require('./db/database')
const morgon = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const Auth =  require('./middleware/auth')
const cors = require('cors')

//import Routes
const userRouter = require('./routes/usersRoute')
const categoryRouter = require('./routes/categoryRoutes')
const productRouter = require('./routes/productRouter')
const brainTreeRouter = require("./routes/brainTreeRoutes")

const app = express()
const port = process.env.PORT || 4000

//middlewares
app.use(morgon('dev'))      //just specifies routes in console like:- ( POST /signup 201 time )
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin' , '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization' );
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

//     next();
// })

//Routes
app.use("/api" , userRouter)
app.use("/api" , categoryRouter)
app.use("/api" , productRouter)
app.use("/api" , brainTreeRouter)

app.listen(port , () => {
    console.log('server is running on port ' +port)
} )