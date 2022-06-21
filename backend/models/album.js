// 2
const mongoose = require('mongoose')

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
