// 3
const Album = require('../models/album')
const router = require('express').Router()
// 6

router.post('/add', (req, res) => {
  // try {
  //   const newAlbum = new Album(req.body)
  //   await newAlbum.save()
  //   res.json(newAlbum)
  // } catch (err) {
  //   console.log('Server error')
  // }

  const newAlbum = new Album(req.body)
  newAlbum.save((err, data) => {
    console.log(newAlbum)

    if (err) {
      return res.json({
        status: false,
        message: 'Server error',
        result: err,
      })
    }
    return res.json({
      status: true,
      message: 'Album added',
      result: data,
    })
  })

  // try {
  //   return res.json({
  //     status: false,
  //     message: 'Album added',
  //     result: data,
  //   })
  // } catch (err) {
  //   return res.json({
  //     status: false,
  //     message: 'Server error',
  //     result: err,
  //   })
  // }
})

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

module.exports = router
