import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
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

  // state to trigger geofetchdata useEffect
  const [data, setData] = useState(undefined)

  // const imageGeoData = useSelector((state) => {
  //   console.log('imageGeodata: ', state)
  //   return state.album.albumDetail
  // })

  const albumDetail = useSelector((state) => {
    // console.log(state)
    return state.album.albumDetail
  })

  const albumDetailImages = useSelector((state) => {
    // console.log(state)
    return state.album.albumDetail.images
  })

  // useEffect(() => {
  //   setData(albumDetail)
  // }, [albumDetail])

  console.log('albumDetail: ', albumDetail)

  // must fetch an album detail on its first mount
  useEffect(() => {
    dispatch(fetchAlbumDetail(albumId))
  }, [])

  // useEffect(() => {
  //   if (albumDetail) {
  //   dispatch(uploadGeoData(albumId))
  //   console.log('The Album Detail in useEffect: ', albumDetail)
  // }}, [])

  // useEffect(() => {
  //   if(albumDetailImages !== []) {
  //     dispatch(uploadGeoData(albumId))
  //   }
  // }, [albumDetailImages])

  // useEffect(() => {
  //   console.log('_________________')
  //   console.log("useSelector: ", data)
  //   console.log('_________________')
  // }, [data])

  ///////////////Drop-zone/////////////////
  const dropImage = (file) => {
    // GET data from HTML to JS Obj
    let formData = new FormData()
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    }
    file.map((file, idx) => {
      return formData.append('image', file)
    })

    dispatch(uploadImageWithGeoData(albumId, formData, config)).then((res) => {
      if (res.payload.status) {
        // console.log(res.payload.status)
        toast.success(res.payload.message)
      }
    })
  }
  ///////////////Drop-zone/////////////////

  const handleDelete = (albumId, imageName) => {
    dispatch(removeImage(albumId, imageName)).then((res) => {
      if (res.payload.status) {
        toast.success(res.payload.message)
      }
    })
  }

  const handleAlbumDelete = (albumId) => {
    dispatch(deleteAlbum(albumId)).then((res) => {
      if (res.payload.status) {
        navigate('/')
      }
    })
  }

  return (
    <>
      <Link to='/'>Back to Gallery</Link>
      <div>---------------------------------------------------------</div>
      <div>Place of visit: {albumDetail && albumDetail.place.placeName}</div>
      <div>---------------------------------------------------------</div>
      <div>Album Name: {albumDetail && albumDetail.name}</div>
      <div>---------------------------------------------------------</div>
      <div>Album Description: {albumDetail && albumDetail.description}</div>
      <div>---------------------------------------------------------</div>

      <div>
        <button onClick={() => dispatch(handleAlbumDelete(albumId))}>DELETE Album</button>
      </div>
      <div>---------------------------------------------------------</div>

      {/* <div>
        <button onClick={() => dispatch(uploadGeoData(albumId))}>Click me to upload Photo geolocation</button>
      </div> */}

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

        {albumDetail &&
          albumDetail.images.map((image, idx) => {
            return (
              <div key={idx}>
                <img alt={image.name} src={`http://localhost:4000/${image}`} />
                <div>
                  <button onClick={() => handleDelete(albumId, image)}>
                    Delete Image
                  </button>
                </div>
              </div>
            )
          })}
      </div>
    </>
  )
}

export default ImageUpload
