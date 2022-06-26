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

  ///////////////////////////////// setTimeout approach

  // setTimeout(() => {
  //   const relativePath = path.join(__dirname, '../uploads/')
  //   const fileName = relativePath + req.files.filename
  //   console.log('filename: ', fileName)

  //   function getExif(filePath) {
  //     console.log(req.files)
  //     let output = exifr.parse(filePath)
  //     // uploads/1656198301708-IMG_1405.JPG
  //     const latitude = output.latitude
  //     const longitude = output.longitude
  //     console.log('latitude: ', latitude)
  //     return output
  //   }
  // }, 1000)

  //////////////////////////////////// not sure

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
  // setTimeout(() => console.log('output lat: ', latitude), 1000)
})

/// UPDATE GEO
router.put('/gggeoUpdate/:albumId', async (req, res) => {
  const albumId = req.params.albumId
  Album.findById(albumId).exec((err, album) => {
    let rawImgArr = album.images
    let imgArr = rawImgArr.map((imgName) => `uploads/${imgName}`)
    console.log(imgArr)
    let imgData = []

    function getGps(filePath) {
      exifr
        .gps(filePath)
        .then((res) => {
          let newData = {
            fileName: filePath.slice(8),
            lat: res.latitude,
            lng: res.longitude,
          }
          imgData.push(newData)
          console.log('exif imgdata: ', imgData)
          return imgData
        })
        .catch(console.log('exif error: ', err))
    }
    imgArr.map((img) => getGps(img))

    // empty due to async?
    setTimeout(() => console.log('after: ', imgData), 1000)
    // console.log('after: ', imgData)

    let geoData = { fileName: 'hi', lat: 1, lng: 2 }

    Album.findOneAndUpdate(
      {
        _id: albumId,
      },
      {
        // addToSet adds the object to array when the obj is not present in the array
        $addToSet: { geolocation: { geoData } },
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
        setTimeout(() => {
          console.log('data: ', data)
        }, 1500)
        return res.json({
          status: true,
          message: 'Upload image geo-data successfully',
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

      function getGps(filePath) {
        exifr
          .gps(filePath)
          .then((res) => {
            let newData = {
              fileName: filePath.slice(8),
              lat: res.latitude,
              lng: res.longitude,
            }
            imgData.push(newData)
            console.log('exif imgdata: ', imgData)
            return imgData
          })
          .catch(console.log('exif error: ', err))
      }
      console.log('outside imgdata: ', imgData)
      let geoData = imgArr.map((img) => getGps(img))

      console.log('Geodata outside: ', geoData)
      ///
      ///
      // let geoData = { imageName: '777', lat: 1, lng: 2 }

      Album.findOneAndUpdate(
        {
          _id: albumId,
        },
        {
          // addToSet adds the object to array when the obj is not present in the array
          $addToSet: { geolocation: geoData },
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
    })
  } catch (err) {
    console.log(err)
    res.send(err)
  }
})

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
