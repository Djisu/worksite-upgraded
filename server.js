//import express and mongoose
const express = require('express')

const connectDB = require('./config/db')

const app = express()

// Connect Database
connectDB()

// Init Middleware. to get the data in req.body
app.use(
  express.json({
    extended: false,
  }),
)

app.get('/', (req, res) => res.send('API Running'))

// Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/service', require('./routes/api/service'))
app.use('/api/contract', require('./routes/api/contract'))
app.use('/api/servicefees', require('./routes/api/servicefees'))
app.use('/api/payment', require('./routes/api/payment'))

const PORT = process.env.PORT || 5000
//server connection
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})

// const __dirname = path.resolve()
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// app.use(express.static(path.join(__dirname, '/frontend/build')))
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/frontend/build/index.html')),
// )

//Middleware for catching errors
app.use((err, req, res, next) => {
  next()
  res.status(500).send({ message: err.message })
})
