// 5

const multer = require('multer')

// from multer doc
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './backend/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.fieldname}`)
  },
})

const upload = multer({ storage: storage })

module.exports = upload
