// 1

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
dotenv.config()

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
