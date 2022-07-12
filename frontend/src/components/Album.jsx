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
import Dropzone from 'react-dropzone'

function ImageUpload() {
  const [modal, setModal] = useState(false)
  const [tempImgSrc, setTempImgSrc] = useState('')

  const [dialog, setDialog] = useState({
    message: '',
    isLoading: false,
  })

  const dispatch = useDispatch()
  let params = useParams()
  const albumId = params.albumId
  const navigate = useNavigate()

  const albumDetail = useSelector((state) => {
    console.log(state)
    return state.album.albumDetail
  })

  // dispatch(fetchAlbumDetail(albumId))

  useEffect(() => {
    // console.log('useEffect fetchAlbumDetail fired')
    dispatch(fetchAlbumDetail(albumId))
  }, [])

  // assign Escape to close modal
  useEffect(() => {
    const close = (e) => {
      if (e.key === 'Escape') {
        setModal(false)
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
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
    handleDialog('Delete this album?', true)
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

  const handleImageDelete = async (albumId, imageName) => {
    // console.log(imageName)
    dispatch(removeImage(albumId, imageName)).then((res) => {
      console.log(res)
      if (res.payload.status) {
        toast.success(res.payload.message)
      }
    })
  }

  const checkImageWithoutGps = () => {
    let imageHasGps =
      Object.keys(albumDetail).length !== 0 &&
      albumDetail.geolocation
        .map((image, idx) => (image.lat === 1010101 ? idx + 1 : ''))
        .filter(String)
        .join(', ')
    if (imageHasGps.length === 1) {
      return (
        <p className='text-red-600 text-xs'>
          Image {imageHasGps} is missing GPS. Please upload only image(s) with GPS.
        </p>
      )
    } else if (imageHasGps.length > 1) {
      return (
        <p className='text-red-600 text-xs'>
          Images {imageHasGps} are missing GPS. Please upload only image(s) with GPS.
        </p>
      )
    }
  }

  const enlargeImg = (imgId) => {
    setTempImgSrc(imgId)
    setModal(true)
  }

  return (
    <div className='mx-auto w-11/12'>
      <Link to='/'>Back to Gallery</Link>
      <div>---------------------------------------------------------</div>
      <div>
        Place of visit:
        {Object.keys(albumDetail).length !== 0 && albumDetail.place.placeName}
      </div>
      <div>Album Name: {Object.keys(albumDetail).length !== 0 && albumDetail.name}</div>
      <div>
        Album Description:
        {Object.keys(albumDetail).length !== 0 && albumDetail.description}
      </div>
      <div>---------------------------------------------------------</div>
      <div>
        <button onClick={() => dispatch(handleAlbumDelete(albumId))}>
          <img className='w-5' src='/delete.png' alt='rubbish-bin' /> Delete Album
        </button>
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

                <p>Drag 'n' drop image files here, or click to select images</p>
                <p>---------------------------------------------------------</p>
              </div>
            </div>
          )}
        </Dropzone>

        {Object.keys(albumDetail).length !== 0 && checkImageWithoutGps()}

        <div
          className={
            modal
              ? 'w-full h-screen fixed top-0 left-0 flex justify-center items-center bg-black z-30'
              : 'h-5 invisible'
            // : 'w-full h-screen fixed top-0 left-0 flex justify-center items-center bg-black  duration-300 invisible scale-0 opacity-0 overflow-hidden z-50'
          } /* transition ease-in duration-300 invisible scale-0 opacity-0 overflow-hidden z-50 */
        >
          <img
            className={
              modal
                ? 'opacity-100 scale-100 max-w-lg box-border w-96 z-40'
                : 'w-auto max-w-full max-h-full h-auto block box-border pt-5 px-0 pb-5 my-0 mx-auto z-40'
            }
            src={tempImgSrc}
            alt={tempImgSrc}
          />
          <img
            className={
              modal
                ? 'fixed right-5 top-4 w-8 h-8 text-white cursor-pointer z-40'
                : 'invisible'
            }
            src='/x.png'
            alt='x'
            onClick={() => setModal(false)}
          />
        </div>
        <div className='sm:columns-1 md:columns-3 lg:columns-4 gap-2 mx-auto space-y-3 pb-28'>
          {Object.keys(albumDetail).length !== 0 &&
            albumDetail?.imageCloudData.map((image, idx) => {
              return (
                <div
                  className='break-inside-avoid border border-stone-900 shadow-2xl rounded-lg bg-'
                  key={idx}
                >
                  <div className='bg-black rounded-lg'>
                    <img
                      className='rounded-t-lg w-full hover:opacity-70 cursor-pointer duration-300 transition ease-in'
                      onClick={() => enlargeImg(image.url)}
                      alt={image.imageId}
                      src={image.url}
                    />
                  </div>
                  <div className='flex justify-between '>
                    <p className='ml-2'>{idx + 1}</p>
                    <img
                      className='max-w-full h-4 mt-[6px] mr-[8px] cursor-pointer'
                      onClick={() => handleImageDelete(albumId, image)}
                      src='/delete.png'
                      alt='rubbish-bin'
                    />
                  </div>
                </div>
              )
            })}
        </div>
      </div>
      {dialog.isLoading && (
        <DeleteDialog onDialog={deleteConfirm} message={dialog.message} />
      )}
    </div>
  )
}

export default ImageUpload
