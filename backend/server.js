//import express and mongoose
import express from 'express'
import mongoose from 'mongoose'
import UserRouter from './routers/userRouter.js'
import ServiceRouter from './routers/serviceRouter.js'
import ContractRouter from './routers/contractRouter.js'

import { keys } from './config/keys.js'
const { mongoURI } = keys

//console.log('mongoURI==', mongoURI)
//const db = require('./config/keys').mongoURI

//Assign app to express
const app = express()

//express encoding
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//mongoose connection  mongodb://localhost/worksite
// DB Config

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

//Routers
app.use('/api/users', UserRouter)
app.use('/api/services', ServiceRouter)
app.use('/api/contracts', ContractRouter)

//Default route
app.get('/', (req, res) => {
  res.send('Server is ready')
})

//Middleware for catching errors
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
})

//server connection
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server listening on ${port}`)
})
