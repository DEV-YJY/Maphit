import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage, removeImage, fetchAlbumDetail, fetchGeoData } from '../actions/album'
import { toast } from 'react-toastify'
// DROP-ZONE
import Dropzone from 'react-dropzone'

function ImageUpload() {
  const dispatch = useDispatch()
  let params = useParams()
  // console.log(params)


  // state to trigger geofetchdata useEffect
  const [flip, setFlip] = useState(false)

  const albumId = params.albumId
  // console.log('albumId: ', albumId)

  const albumDetail = useSelector(state => {
    // console.log(state)
    return state.album.albumDetail})

  // const imageGeoData = useSelector(state => state.album.imageGeoData)
  console.log('albumDetail: ', albumDetail)

  //Drop-zone
  const dropImage = file => {
    // GET data from HTML to JS Obj
    let formData = new FormData()
    const config = {
      header: {'content-type': 'multipart/form-data'}
    }
    file.map((file, idx) => {
      return formData.append('image', file)
    })

    dispatch(uploadImage(albumId, formData, config))
      .then(res => {
        if (res.payload.status) {
          // console.log(res.payload.status)
          toast.success(res.payload.message)
        }
      })
  }

  const handleDelete = (albumId, imageName) => {
    dispatch(removeImage(albumId, imageName))
      .then(res => {
        if (res.payload.status) {
          toast.success(res.payload.message)
        }
      })
  }

  useEffect(() => {
    dispatch(fetchAlbumDetail(albumId))
  }, [])
  
  // function handleFetchGeoData() {
  //   dispatch(fetchGeoData(albumId))
  // }

  // useEffect(() => {
  //   dispatch(fetchGeoData(albumId))
  // }, [flip])


  // console.log(imageGeoData.geolocation)


  return (
    <>
      <Link to='/'>Back to Albums</Link>
      {/* <div>
        <button onClick={() => handleFetchGeoData()}>I am a button</button>
      </div> */}
      
      {/* <div>
        <button onClick={() => setFlip(!flip)}>I am a button</button>
      </div> */}
      <div>
        <Link to={`/upload/${albumId}/geo`}>geo Button</Link>
      </div>
      <div>
        <Link to={`/upload/${albumId}/map`}>Map Button</Link>
      </div>
      <div>Upload Image Album name: {albumDetail && albumDetail.name}</div>
      <div>Memories</div>
      <div>
      <Dropzone onDrop={dropImage}>
        {({getRootProps, getInputProps}) => (
          <div>
            <div {...getRootProps()}>
              <input {...getInputProps()} />upload/62b962ace585631848c6cc4c
              {/* FIVE images max at a time */}
              <p>Drag 'n' drop image files here, or click to select images</p>
            </div>
          </div>
        )}
      </Dropzone>

        {albumDetail && 
          albumDetail.images.map((image, idx) => {
            return (
              <div key={idx}>
                <img 
                  alt={image.name}
                  src={`http://localhost:4000/${image}`} 
                />
                <div>
                  <button onClick={() => handleDelete(albumId, image)}>Delete Image</button>
                </div>
              </div>
            )
          })}
      </div>
    </>
    )
}

export default ImageUpload