// 3
const Album = require('../models/album')
const router = require('express').Router()
// 6

// bottom two will need to be switched //

// const upload = require('../middleware/multer')
const upload = require('../utils/multer')
const fs = require('fs')
const cloudinary = require('../utils/cloudinary')
const path = require('path')
const exifr = require('exifr')
const { userInfo } = require('os')

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
      // console.log('this is data: ', data)
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

// if want to revert delete album -> get it from github
// DELETE Album
router.delete('/delete/:albumId', async (req, res) => {
  try {
    const albumId = req.params.albumId

    // let album = await Album.findById(req.params.albumId)
    // await cloudinary.uploader.destroy(idToDelete)

    Album.findByIdAndRemove(albumId).exec((err, data) => {
      // console.log(data)
      cloudinary.api.delete_resources(data.imageCloudData.map((id) => id.cloudinaryId))
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

// GET albumById // fetchAlbumDetail
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

///////////////// CLOUDINARY IMAGE UPLOAD TRIAL
router.put('/upload/:albumId', upload.array('image'), async (req, res) => {
  try {
    const albumId = req.params.albumId
    let imageFiles = req.files

    let realResult = await Promise.all(
      imageFiles.map(async (image) => {
        let cloudRes = await cloudinary.uploader.upload(image.path)
        // below depends on the res returned from the above
        let accData = await Album.findOneAndUpdate(
          {
            _id: albumId,
          },
          {
            $push: {
              imageCloudData: [
                {
                  imageName:
                    cloudRes.original_filename +
                    '-' +
                    cloudRes.public_id +
                    '-' +
                    cloudRes.url,
                  cloudinaryId: cloudRes.public_id,
                  url: cloudRes.url,
                },
              ],
            },
          },
          {
            new: true,
          }
        )
        return accData
      })
    )
    return res.json({
      status: 200,
      message: 'Image(s) uploaded successfully',
      result: realResult[0],
    })
  } catch (err) {
    // console.log('i am a catch error: ', err)
    return res.sendStatus(500).send('Server error, fail to remove image')
  }
})

///////////////////////////////// CLOUDINARY IMAGE GEODATA EXTRACTION TRIAL
router.put('/geoUpdate/:albumId', async (req, res) => {
  try {
    const albumId = req.params.albumId
    let imgData = []

    Album.findById(albumId).exec((err, album) => {
      const imageUrl = album.imageCloudData
      console.log('iam url: ', imageUrl)

      async function getGps(filePath) {
        let result = await exifr.gps(filePath)
        let newData
        if (result) {
          newData = {
            imageId: filePath,
            lat: result.latitude,
            lng: result.longitude,
          }
        } else if (result === undefined) {
          newData = {
            imageId: filePath /* + '-' + 'noGps' */,
            lat: 1010101,
            lng: 1010101,
          }
        }
        // return error message when no geo?

        console.log('1 inside newData: ', newData)
        console.log('2 inside imgdata: ', imgData)
        return newData
      }

      Promise.all(
        imageUrl.map((img) => {
          // console.log('log me')
          return getGps(img.url)
        })
      ).then((geoData) => {
        console.log('3 Outside geodata: ', geoData)
        let finalData = geoData

        console.log('4 final data: ', finalData)

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
          } /* ,
          function (err, data) {
            if (err) {
              return res.json({
                status: 500,
                message: 'Server error, fail to remove image',
                result: err,
              })
            }
            return res.json({
              status: 200,
              message: 'Image removed successfully',
              result: data,
            })
          } */
        ).exec((err, data) => {
          return res.json({
            status: true,
            message: 'Upload image with geolocation successfully',
            result: data,
          })
        })
      })
    })
  } catch (err) {
    // console.log(err)
    res.status(500).send(err)
  }
})

///////////////////// cloudinary delete image trial
router.put('/removeImage/:albumId', async (req, res) => {
  try {
    const albumId = req.params.albumId
    console.log('albumID: ', albumId)
    const imageName = req.body.fileName
    const idToDelete = req.body.fileName.split('-')[1]
    const urlToDelete = req.body.fileName.split('-')[2]

    // console.log('to delete1: ', imageName)
    // console.log('to delete2: ', idToDelete)
    // console.log('to delete3: ', urlToDelete)

    await cloudinary.uploader.destroy(idToDelete)

    Album.findOneAndUpdate(
      {
        _id: albumId,
      },
      {
        // pull to remove image by filename
        $pull: {
          geolocation: {
            imageId: urlToDelete,
          },
          imageCloudData: {
            imageName: imageName,
            cloudinaryId: idToDelete,
            url: urlToDelete,
          },
        },
      },
      {
        new: true,
      },

      function (err, data) {
        if (err) {
          return res.json({
            status: 500,
            message: 'Server error, fail to remove an image',
            result: err,
          })
        }
        console.log(data)
        return res.json({
          status: 200,
          message: 'Image removed successfully',
          result: data,
        })
      }
    )
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
