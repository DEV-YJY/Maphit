// 2
const mongoose = require('mongoose')

// defines the shape of data
const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  images: {
    type: [String],
    require: false,
  },
})

//
// trial
// const albumSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   cloudinary_id: {
//     type: String,
//   },
//   images: {
//     type: String,
//     require: true,
//   },
// })

module.exports = mongoose.model('Album', albumSchema)
