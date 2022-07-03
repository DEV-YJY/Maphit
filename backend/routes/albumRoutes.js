// 3
const Album = require('../models/album')
const router = require('express').Router()
// 6
const upload = require('../middleware/multer')
const fs = require('fs')
const cloudinary = require('../utils/cloudinary')
const path = require('path')
const exifr = require('exifr')

// create a new Post: object.save()
// find a Post by id: findById(id)
// retrieve all Posts: find()
// update a Post by id: findByIdAndUpdate(id, data)
// remove a Post: findByIdAndRemove(id)
// remove all Post: deleteMany()

// AUTH
// router.get('/auth', (req, res) => {
//   console.log(res)
//   res.render({
//     isAuthenticated: req.oidc.isAuthenticated(),
//   })
// })

// ADD Album
router.post('/add', async (req, res) => {
  try {
    // console.log('req.body: ', req.body)
    const newAlbum = new Album(req.body)
    await newAlbum.save((err, data) => {
      // console.log('new album:', newAlbum)
      res.json({
        status: 200,
        message: 'Album added successfully',
        result: data,
      })
    })
  } catch (err) {
    res.status(500).send('Server error')
  }
})

// DELETE Album
router.delete('/delete/:albumId', async (req, res) => {
  try {
    const albumId = req.params.albumId

    Album.findByIdAndRemove(albumId).exec((err, data) => {
      const relativePath = path.join(__dirname, '../uploads/')

      data.images.map((i) => {
        let filePath = relativePath + i
        console.log(filePath)
        fs.unlinkSync(filePath)
      })

      res.json({
        status: 200,
        message: 'Album removed successfully',
        result: data,
      })
    })
  } catch (err) {
    res.status(500).send('Delete error: ', err)
  }
})

// GET all the albums
router.get('/', async (req, res) => {
  try {
    await Album.find().exec((err, albums) => {
      res.json({
        status: 200,
        message: 'Retrieved albums successfully',
        result: albums,
      })
    })
  } catch (err) {
    res.status(500).send('Server error')
  }
})

// GET albumById
router.get('/:albumId', (req, res) => {
  const albumId = req.params.albumId
  Album.findById(albumId).exec((err, albums) => {
    if (err) {
      return res.json({
        status: 500,
        message: 'Server error, failed to retrieve an album',
        result: err,
      })
    }
    return res.json({
      status: 200,
      message: 'Retrieved album successfully',
      result: albums,
    })
  })
})

// UPLOAD image to a specific album
router.put('/upload/:albumId', upload.array('image', 5), (req, res) => {
  try {
    const albumId = req.params.albumId
    // console.log(req.params)
    // console.log('req.files: ', req.files)
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
      if (images.length === 0) {
        res.status(500).send('No images added')
        return
      }
      return res.json({
        status: 200,
        message: 'Upload image(s) successfully',
        result: data,
      })
    })
  } catch (err) {
    console.log(err)
    res.status(500).send('Server error')
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
        // let dummy = {
        //   imageId: '1656236899754-IMG_1405.JPG',
        //   lat: -44.87338888888889,
        //   lng: 168.94946388888889,
        // }

        Album.findOneAndUpdate(
          {
            _id: albumId,
          },
          {
            // addToSet adds the object to array when the obj is not present in the array
            // set replaces the whole array
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
    res.status(500).send(err)
  }
})

/////////////////////////////////////////////////////////////////////
//
//
// DELETE image
router.put('/removeImage/:albumId', async (req, res) => {
  const albumId = req.params.albumId
  const fileName = req.body.fileName

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
          status: 500,
          message: 'Server error, fail to remove image',
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
        status: 200,
        message: 'Image removed successfully',
        result: data,
      })
    }
  )
})

module.exports = router
