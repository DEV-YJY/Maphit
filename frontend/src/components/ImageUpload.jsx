import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage, removeImage, fetchAlbumDetail } from '../actions/album'
import { toast } from 'react-toastify'
// DROP-ZONE
import Dropzone from 'react-dropzone'

function ImageUpload(props) {
  const dispatch = useDispatch()
  let params = useParams()
  // console.log(params)
  const albumId = params.albumId
  // console.log('albumId: ', albumId)
  const albumDetail = useSelector(state => state.album.albumDetail)
  // console.log('albumDetail: ', albumDetail)

  const dropImage = file => {
    let formData = new FormData()
    const config = {
      header: {'content-type': 'multipart/form-data'}
    }
    file.map((file, idx) => {
      formData.append('image', file)
    })

    dispatch(uploadImage(albumId, formData, config)).then(res => {
      if (res.payload.status) {

      }
    })
  }

  useEffect(() => {
    dispatch(fetchAlbumDetail(albumId))
  }, [])
  

  return (
    <>
      <Link to='/'>Back to Albums</Link>
      <div>Upload Image Album name: {albumDetail.name}</div>
      <div>Memories</div>
      <div>
      <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>

        {albumDetail.images && 
          albumDetail.images.map((image, idx) => {
            return (
              <div key={idx}>
                <img 
                  alt={image.name}
                  src={`http://localhost:4000/${image}`} 
                />
                <div>
                  <button>Delete Image</button>
                </div>
              </div>
            )
          })}
      </div>
    </>
    )
}
 
export default ImageUpload