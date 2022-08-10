// 2
const mongoose = require('mongoose')

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
  place: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    placeName: { type: String, required: true },
    _id: false,
  },
  geolocation: [
    {
      imageId: { type: String, required: false },
      lat: { type: Number, required: false },
      lng: { type: Number, required: false },
      _id: false,
    },
  ],
  imageCloudData: [
    {
      imageName: { type: String, required: false },
      cloudinaryId: { type: String, required: false },
      url: { type: String, required: false },
      _id: false,
    },
  ],
  user_id: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Album', albumSchema)
