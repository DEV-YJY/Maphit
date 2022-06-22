// 3
const Album = require('../models/album')
const router = require('express').Router()
// 6
const upload = require('../middleware/multer')
const fs = require('fs')
const cloudinary = require('../utils/cloudinary')
const path = require('path')

// ADD Album
router.post('/add', async (req, res) => {
  try {
    const newAlbum = new Album(req.body)
    await newAlbum.save((err, data) => {
      console.log(newAlbum)
      res.json({
        status: true,
        message: 'Album added successfully',
        result: data,
      })
    })
  } catch (err) {
    console.log('Server error')
  }
})
// const newAlbum = new Album(req.body)
// newAlbum.save((err, data) => {
//   console.log(newAlbum)

//   if (err) {
//     return res.json({
//       status: false,
//       message: 'Server error',
//       result: err,
//     })
//   }
//   return res.json({
//     status: true,
//     message: 'Album added',
//     result: data,
//   })

// GET all the albums
router.get('/', (req, res) => {
  Album.find().exec((err, albums) => {
    if (err) {
      return res.json({
        status: false,
        message: 'Server error',
        result: err,
      })
    }
    return res.json({
      status: true,
      message: 'Retrieved albums successfully',
      result: albums,
    })
  })
})

// GET albumById
router.get('/:albumId', (req, res) => {
  const albumId = req.params.albumId
  Album.findById(albumId).exec((err, albums) => {
    if (err) {
      return res.json({
        status: false,
        message: 'Server error',
        result: err,
      })
    }
    return res.json({
      status: true,
      message: 'Retrieved albums successfully',
      result: albums,
    })
  })
})

// UPLOAD image to a specific album
router.put('/upload/:albumId', upload.array('image', 5), async (req, res) => {
  const albumId = req.params.albumId
  // console.log(req.params)
  // console.log(req.files)
  const images = []
  const inputFiles = req.files

  inputFiles.map((file) => images.push(file.filename))

  Album.findOneAndUpdate(
    {
      _id: albumId,
    },
    {
      $push: { images: images },
    },
    // to return the data after applying update
    {
      new: true,
    },
    function (err, data) {
      if (err) {
        return res.json({
          status: false,
          message: 'Server error',
          result: err,
        })
      }
      return res.json({
        status: true,
        message: 'Upload image(s) successfully',
        result: data,
      })
    }
  )
})

// DELETE image
router.put('/removeImage/:albumId', async (req, res) => {
  const albumId = req.params.albumId
  const fileName = req.body.fileName
  // need to get the file ext!!
  // console.log('original name: ', req.file)
  console.log(req.body)
  // console.log('this is ext: ', fileExt)
  console.log('albumID: ', albumId)
  console.log('file name: ', fileName)
  Album.findOneAndUpdate(
    {
      _id: albumId,
    },
    {
      // pull to remove image by filename
      $pull: { images: fileName },
    },
    {
      new: true,
    },

    function (err, data) {
      if (err) {
        return res.json({
          status: false,
          message: 'Server error',
          result: err,
        })
      }
      // remove from the local folder as well
      const relativePath = path.join(__dirname, '/uploads/')
      console.log('this is relative path: ', relativePath)
      const filePath = relativePath + fileName
      console.log('this is filepath: ', filePath)
      fs.unlinkSync(filePath)
      // fs.unlinkSync(
      //   '/home/devyj/playground/mern-practice/project-gallery/backend/uploads/1655889274683-maldivescity.jpeg'
      // )
      //
      return res.json({
        status: true,
        message: 'Image removed successfully',
        result: data,
      })
    }
  )
})

module.exports = router
