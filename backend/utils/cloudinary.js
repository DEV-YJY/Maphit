const cloudinary = require('cloudinary').v2
// require('dotenv').config()

const dotenv = require('dotenv')
dotenv.config()

// cloudinary.config({
//   cloud_name: 'dcejulejt',
//   api_key: '122412368769824',
//   api_secret: 'nyycL7GjQS_TA-K7CnfIHxK9oA8',
// })

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
// console.log(cloudinary.config())

module.exports = cloudinary
