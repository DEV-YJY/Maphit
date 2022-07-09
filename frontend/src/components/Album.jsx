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
    // console.log(state.album)
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

  const checkImageWithoutGps = () => {
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

  const enlargeImg = (imgId) => {
    setTempImgSrc(imgId)
    setModal(true)
  }

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
        Album Description:
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
              ? 'w-full h-screen fixed top-0 left-0 flex justify-center items-center bg-black z-50'
              : 'h-5 invisible'
            // : 'w-full h-screen fixed top-0 left-0 flex justify-center items-center bg-black  duration-300 invisible scale-0 opacity-0 overflow-hidden z-50'
          } /* transition ease-in duration-300 invisible scale-0 opacity-0 overflow-hidden z-50 */
        >
          <img
            className={
              modal
                ? 'opacity-100 scale-100 max-w-lg w-auto box-border'
                : 'w-auto max-w-full max-h-full h-auto block box-border pt-5 px-0 pb-5 my-0 mx-auto'
            }
            src={tempImgSrc}
            alt={tempImgSrc}
          />
          <svg
            className='fixed right-5 top-4 w-8 h-8 bg-black text-white cursor-pointer'
            onClick={() => setModal(false)}
            xmlns='http://www.w3.org/2000/svg'
            class='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            stroke-width='2'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </div>
        <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2 w-[1200px] mx-auto space-y-3 pb-28'>
          {Object.keys(albumDetail).length !== 0 &&
            albumDetail?.imageCloudData.map((image, idx) => {
              return (
                <div
                  className='break-inside-avoid border border-stone-900 shadow-2xl rounded-lg bg-'
                  key={idx}
                  onClick={() => enlargeImg(image.url)}
                >
                  <div className='bg-black rounded-lg'>
                    <img
                      className='rounded-t-lg w-full hover:opacity-70 cursor-pointer duration-300 transition ease-in'
                      alt={image.imageId}
                      src={image.url}
                    />
                  </div>
                  <div className='flex'>
                    <p>{idx + 1}</p>
                    <button onClick={() => handleImageDelete(albumId, image)}>
                      Delete Image
                    </button>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
      {dialog.isLoading && (
        <DeleteDialog onDialog={deleteConfirm} message={dialog.message} />
      )}
    </>
  )
}

export default ImageUpload
