import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DeleteDialog from './DeleteDialog'
import {
  uploadImage,
  removeImage,
  fetchAlbumDetail,
  uploadGeoData,
  deleteAlbum,
  uploadImageWithGeoData,
} from '../redux/actions/album'
import { toast } from 'react-toastify'
// DROP-ZONE
import Dropzone from 'react-dropzone'

function ImageUpload() {
  const dispatch = useDispatch()
  let params = useParams()
  const albumId = params.albumId
  const navigate = useNavigate()

  const [dialog, setDialog] = useState({
    message: '',
    isLoading: false,
  })

  const albumDetail = useSelector((state) => {
    // console.log(state.album)
    return state.album.albumDetail
  })

  // dispatch(fetchAlbumDetail(albumId))

  useEffect(() => {
    // console.log('useEffect fetchAlbumDetail fired')
    dispatch(fetchAlbumDetail(albumId))
  }, [])

  // useEffect(() => {
  //   console.log('_________________')
  //   console.log("useSelector: ", data)
  //   console.log('_________________')
  // }, [data])

  ///////////////Drop-zone/////////////////
  const dropImage = async (file) => {
    // GET data from HTML to JS Obj
    let formData = new FormData()
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    }
    file.map((file, idx) => {
      return formData.append('image', file)
    })

    await dispatch(uploadImageWithGeoData(albumId, formData, config)).then((res) => {
      if (res.payload.resGeo.status === 200) {
        // console.log(res)
        toast.success(res.payload.resGeo.data.message)
      }
    })
    await dispatch(fetchAlbumDetail(albumId))
  }
  ///////////////Drop-zone/////////////////

  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    })
  }

  const handleAlbumDelete = (albumId) => {
    handleDialog('Are you sure you want to delete this album?', true)
    // console.log('im dialog: ', dialog)
  }

  const deleteConfirm = (choice) => {
    if (choice) {
      dispatch(deleteAlbum(albumId)).then((res) => {
        if (res.payload.status) {
          navigate('/')
        }
      })
      handleDialog('', false)
    } else {
      handleDialog('', false)
    }
  }

  const handleImageDelete = (albumId, imageName) => {
    // console.log(imageName)
    dispatch(removeImage(albumId, imageName)).then((res) => {
      if (res.payload.status) {
        toast.success(res.payload.message)
      }
    })
  }

  function checkImageWithoutGps() {
    let imageHasGps =
      Object.keys(albumDetail).length !== 0 &&
      albumDetail.geolocation
        .map((image, idx) => (image.lat === 1010101 ? idx + 1 : ''))
        .filter(String)
        .join(', ')
    if (imageHasGps.length > 0) {
      return (
        <p className='text-red-600 text-xs'>
          Image {imageHasGps} is missing GPS. Please upload only image(s) with GPS.
        </p>
      )
    }
  }
  console.log(checkImageWithoutGps())

  return (
    <>
      <Link to='/'>Back to Gallery</Link>
      <div>---------------------------------------------------------</div>
      <div>
        Place of visit:
        {Object.keys(albumDetail).length !== 0 && albumDetail.place.placeName}
      </div>
      <div>Album Name: {Object.keys(albumDetail).length !== 0 && albumDetail.name}</div>
      <div>
        Album Description:{' '}
        {Object.keys(albumDetail).length !== 0 && albumDetail.description}
      </div>
      <div>---------------------------------------------------------</div>
      <div>
        <button onClick={() => dispatch(handleAlbumDelete(albumId))}>DELETE Album</button>
      </div>
      <div>---------------------------------------------------------</div>
      <div>---------------------------------------------------------</div>
      <div>
        <Link to={`/upload/${albumId}/map`}>Map it</Link>
      </div>
      <div>---------------------------------------------------------</div>
      <div>---------------------------------------------------------</div>
      <div>
        <Dropzone onDrop={dropImage}>
          {({ getRootProps, getInputProps }) => (
            <div>
              <div {...getRootProps()}>
                <input {...getInputProps()} />

                {/* FIVE images max at a time */}
                <p>Drag 'n' drop image files here, or click to select images</p>
                <p>---------------------------------------------------------</p>
              </div>
            </div>
          )}
        </Dropzone>

        {Object.keys(albumDetail).length !== 0 && checkImageWithoutGps()}

        {Object.keys(albumDetail).length !== 0 &&
          albumDetail?.imageCloudData.map((image, idx) => {
            return (
              <div key={idx}>
                <img alt={image.imageId} src={image.url} />
                <p>{idx + 1}</p>
                <div>
                  <button onClick={() => handleImageDelete(albumId, image)}>
                    Delete Image
                  </button>
                </div>
              </div>
            )
          })}
      </div>
      {dialog.isLoading && (
        <DeleteDialog onDialog={deleteConfirm} message={dialog.message} />
      )}
    </>
  )
}

export default ImageUpload
