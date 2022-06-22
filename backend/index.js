// 1

const express = require('express')
const app = express()
let path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
dotenv.config()

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'uploads')))

// Connect DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB is connected'))
  .catch((err) => console.log('error: ', err))

// Route
app.listen(4000, () => {
  console.log('Server running on port 4000')
})

// 4
app.use('/albums', require('./routes/albumRoutes'))
// app.use('/albums', require('./routes/cloudRoutes'))
