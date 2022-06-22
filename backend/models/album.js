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

module.exports = mongoose.model('Album', albumSchema)
