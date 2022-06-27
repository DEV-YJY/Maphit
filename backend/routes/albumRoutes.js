// 3
const Album = require('../models/album')
const router = require('express').Router()
// 6
const upload = require('../middleware/multer')
const fs = require('fs')
const cloudinary = require('../utils/cloudinary')
const path = require('path')
const exifr = require('exifr')

// ADD Album
router.post('/add', async (req, res) => {
  try {
    const newAlbum = new Album(req.body)
    await newAlbum.save((err, data) => {
      // console.log(newAlbum)
      res.json({
        status: true,
        message: 'Album added successfully',
        result: data,
      })
    })
  } catch (err) {
    res.status().send('Server error')
  }
})

// GET all the albums
router.get('/', async (req, res) => {
  try {
    await Album.find().exec((err, albums) => {
      res.json({
        status: true,
        message: 'Retrieved albums successfully',
        result: albums,
      })
    })
  } catch (err) {
    res.status().send('Server error')
  }
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
router.put('/upload/:albumId', upload.array('image', 5), (req, res) => {
  try {
    const albumId = req.params.albumId
    // console.log(req.params)
    console.log('req.files: ', req.files)
    const images = []
    const inputFiles = req.files

    // add filename to images array
    inputFiles.map((file) => images.push(file.filename))

    Album.findOneAndUpdate(
      {
        _id: albumId,
      },
      {
        $push: { images: images },
      },
      {
        new: true,
      }
    ).exec((err, data) => {
      return res.json({
        status: true,
        message: 'Upload image(s) successfully',
        result: data,
      })
    })
  } catch (err) {
    console.log(err)
    res.send(err)
  }
})

////////////////////////////////////
//////////////////////// Adding lat & lng
////////////////////////////////////
router.put('/geoUpdate/:albumId', async (req, res) => {
  try {
    const albumId = req.params.albumId
    let rawImgArr
    let imgArr
    let imgData = []

    Album.findById(albumId).exec((err, album) => {
      rawImgArr = album.images
      imgArr = rawImgArr.map((imgName) => `uploads/${imgName}`)
      // console.log(imgArr)

      async function getGps(filePath) {
        let result = await exifr.gps(filePath)
        let newData = {
          imageId: filePath.slice(8),
          lat: result.latitude,
          lng: result.longitude,
        }
        console.log('1 inside newData: ', newData)
        // imgData.push(newData)
        console.log('2 inside imgdata: ', imgData)
        return newData
      }

      // console.log('outside imgdata: ', imgData)
      Promise.all(
        imgArr.map((img) => {
          console.log('log me')
          return getGps(img)
        })
      ).then((geoData) => {
        console.log('3 Outside geodata: ', geoData)
        let finalData = geoData

        console.log('4 final data: ', finalData)
        let dummy = {
          imageId: '1656236899754-IMG_1405.JPG',
          lat: -44.87338888888889,
          lng: 168.94946388888889,
        }

        Album.findOneAndUpdate(
          {
            _id: albumId,
          },
          {
            // addToSet adds the object to array when the obj is not present in the array
            $set: { geolocation: finalData },
          },
          {
            new: true,
          }
        ).exec((err, data) => {
          return res.json({
            status: true,
            message: 'Upload image geo-data successfully',
            result: data,
          })
        })
      })
    })
  } catch (err) {
    console.log(err)
    res.send(err)
  }
})

/////////////////////////////////////////////////////////////////////
//
//
// DELETE image
router.put('/removeImage/:albumId', async (req, res) => {
  const albumId = req.params.albumId
  const fileName = req.body.fileName
  // need to get the file ext!!
  // console.log('original name: ', req.file)
  // console.log(req.body)
  // console.log('this is ext: ', fileExt)
  // console.log('albumID: ', albumId)
  // console.log('file name: ', fileName)
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
      const relativePath = path.join(__dirname, '../uploads/')
      // console.log('this is relative path: ', relativePath)
      const filePath = relativePath + fileName
      // console.log('this is filepath: ', filePath)
      fs.unlinkSync(filePath)
      // fs.unlinkSync(
      //   '/home/devyj/playground/mern-practice/project-gallery/backend/uploads/1655939149468-image0.jpeg'
      // )

      return res.json({
        status: true,
        message: 'Image removed successfully',
        result: data,
      })
    }
  )
})

module.exports = router
