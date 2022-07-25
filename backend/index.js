// 1

const express = require('express')
const app = express()
let path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')

const albumRoutes = require('./routes/albumRoutes')
const userRoutes = require('./routes/userRoutes')

dotenv.config()

// const { auth } = require('express-openid-connect')

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: process.env.SECRET,
//   baseURL: process.env.BASEURL,
//   clientID: process.env.CLIENTID,
//   issuerBaseURL: process.env.ISSUER,
// }

app.use(cors())

// parse requests of content-type
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json())
// serve static files
app.use(express.static(path.join(__dirname, 'uploads')))
// app.use(auth(config))

// Connect DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log('MongoDB is connected'))
  .catch((err) => console.log('error: ', err))

// Route
app.listen(4000, () => {
  console.log('Server running on port 4000')
})

// 4 - register routes
app.use('/albums', albumRoutes)
app.use('/user', userRoutes)
// app.use('/albums', require('./routes/cloudRoutes'))

module.exports = app
