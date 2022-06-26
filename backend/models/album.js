// 2
const mongoose = require('mongoose')

const geoSchema = new mongoose.Schema({
  imageName: {
    type: String,
    required: false,
  },
  lat: {
    type: Number,
    required: false,
  },
  lng: {
    type: Number,
    required: false,
  },
})

// defines the shape of data
const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: false,
  },
  geolocation: [
    {
      imageId: { type: String, required: true },
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      _id: false,
    },
  ],
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
// })

module.exports = mongoose.model('Album', albumSchema)
