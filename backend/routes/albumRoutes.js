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
// Album.find().exec((err, albums) => {
//   if (err) {
//     return res.json({
//       status: false,
//       message: 'Server error',
//       result: err,
//     })
//   }
//   return res.json({
//     status: true,
//     message: 'Retrieved albums successfully',
//     result: albums,
//   })
// })

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
    const newGeo = {}
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
      // {
      //   // geolocation??
      //   $push: { geolocation: newGeo },
      // },
      // to return the data after applying update
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

  //
  // extract gelocation through exifr

  // newGeo = [
  //   {
  //     fileName:
  //     lat: latitude,
  //     lng: longitude,
  //   },
  // ]

  // const relativePath = path.join(__dirname, '../uploads/')
  // const fileName = relativePath + req.files.filename

  // console.log('filename: ', fileName)

  // async function getExif(filePath) {
  //   console.log(req.files)
  //   let output = await exifr.parse(filePath)
  //   // uploads/1656198301708-IMG_1405.JPG
  //   const latitude = output.latitude
  //   const longitude = output.longitude
  //   console.log('latitude: ', latitude)
  //   return output
  // }
  // let { latitude, longitude } = getExif(fileName)
  // console.log('output lat: ', latitude)
})

/// UPDATE GEO
router.put('/geoUpdate/:albumId', async (req, res) => {
  const albumId = req.params.albumId
  Album.findById(albumId).exec((err, album) => {
    let rawImgArr = album.images
    let imgArr = rawImgArr.map((imgName) => `uploads/${imgName}`)

    let imgData = []

    async function getExif(filePath) {
      let { latitude, longitude } = await exifr.parse(filePath)
      let newData = {
        fileName: filePath,
        lat: latitude,
        lng: longitude,
      }
      imgData.push(newData)
      console.log('before: ', imgData)
      return imgData
    }

    imgArr.map((img) => getExif(img))

    // empty due to async?
    console.log('after: ', imgData)

    Album.findOneAndUpdate(
      {
        _id: albumId,
      },
      {
        $push: { geolocation: imgData },
      },
      {
        new: true,
      }
    ),
      function (err, data) {
        if (err) {
          console.log('error: ', err)
          return res.json({
            status: false,
            message: 'Server error',
            result: err,
          })
        }
        console.log('data: ', data)
        return res.json({
          status: true,
          message: 'Upload image get-data successfully',
          result: data,
        })
      }
  })
})

//     .exec((err, data) => {
//       return res.json({
//         status: true,
//         message: 'Upload image geo-data successfully',
//         result: data,
//       })
//     })
//   }
//  catch (err) {
//   console.log(err)
//   res.send(err)
//   }
// )

//
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
