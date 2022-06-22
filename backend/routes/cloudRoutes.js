const router = require('express').Router()
const cloudinary = require('../utils/cloudinary')
const Album = require('../models/album')
const upload = require('../utils/multer')

// CREATE ALBUM
router.post('/add', upload.array('image', 5), async (req, res) => {
  try {
    console.log(cloudinary.uploader.upload())
    const uploadRes = await cloudinary.uploader.upload(req.file.path)
    const album = new Album({
      name: req.body.name,
      description: req.body.description,
      cloudinary_id: uploadRes.public_id,
      image: uploadRes,
    })

    const savedAlbum = await album.save()
    req.statusCode(200).send(savedAlbum)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

router.get('/', async (req, res) => {
  try {
    const album = await Album.find()
    res.status(200).send(album)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

module.exports = router
