const multer = require('multer')
const path = require('path')

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname)
    if (!ext.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
      /* ext !== '.jpg' &&
      ext !== '.JPG' &&
      ext !== '.jpeg' &&
      ext !== '.JPEG' &&
      ext !== '.png' &&
      ext !== '.PNG'
    ) */
      // two arg ( err, in case of err do not accept file)
      cb(new Error('File type is not supported'), false)
      return
    }
    cb(null, true)
  },
})

// for cloudinary??
