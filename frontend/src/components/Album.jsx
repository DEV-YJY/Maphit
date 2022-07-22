import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DeleteDialog from './DeleteDialog'
import {
  removeImage,
  fetchAlbumDetail,
  deleteAlbum,
  uploadImageWithGeoData,
} from '../redux/actions/album'
import { toast } from 'react-toastify'
import Dropzone from 'react-dropzone'
import Nav from './Nav'

function ImageUpload() {
  const [modal, setModal] = useState(false)
  const [tempImgSrc, setTempImgSrc] = useState('')
  const [tempInfo, setTempInfo] = useState({
    imageName: '',
    idx: '',
  })

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
          Image {imageHasGps} is missing GPS. <br /> Please upload only image(s) with GPS.
        </p>
      )
    } else if (imageHasGps.length > 1) {
      return (
        <p className='text-red-600 text-xs'>
          Images {imageHasGps} are missing GPS. <br /> Please upload only image(s) with
          GPS.
        </p>
      )
    }
  }

  const enlargeImg = (imgId, imgName, idx) => {
    setTempImgSrc(imgId)
    setModal(true)
    setTempInfo({
      imageName: imgName,
      idx: idx,
    })
    console.log(tempInfo.idx)
  }

  const handleImageDelete = async () => {
    const { imageName, idx } = tempInfo
    await dispatch(removeImage(albumId, imageName)).then((res) => {
      console.log(tempInfo)
      if (res.payload.status) {
        toast.success(`Image ${idx + 1} was removed successfully`)
      }
    })
    setTempInfo({
      imageName: '',
      idx: '',
    })
    setModal(false)
  }

  return (
    <div className='mx-auto pt-3 w-11/12'>
      <Nav />
      <div className='flex flex-col items-center justify-around mt-3'>
        <div className='flex flex-col items-center mb-2'>
          <div className='w-7 h-7 lg:w-9 lg:h-9 md:w-8 md:h-8 sm:w-7 sm:h-7 relative cursor-pointer rounded-xl transition duration-500 transform bg-red-400 -translate-x-2 p-1 '>
            <img
              className='w-8 '
              onClick={() => dispatch(handleAlbumDelete(albumId))}
              src='/delete-colour.png'
              alt='rubbish-bin'
            />
          </div>

          {Object.keys(albumDetail).length !== 0 && (
            <>
              <h3>Name: {albumDetail.name}</h3>
              <h3>Place: {albumDetail.place.placeName}</h3>
              <h3>Description: {albumDetail.description}</h3>
            </>
          )}
        </div>
      </div>

      <div>
        <div className='flex justify-around mb-2'>
          <Dropzone onDrop={dropImage}>
            {({ getRootProps, getInputProps }) => (
              <div className='flex justify-center'>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className='w-9 h-9 lg:w-10 lg:h-10 md:w-9 md:h-9 relative cursor-pointer rounded-xl transition duration-500 transform bg-purple-200 -translate-x-2 p-1 '>
                    <img className='' src='/add-image.png' alt='add-img' />
                  </div>
                </div>
              </div>
            )}
          </Dropzone>
          <div className='w-9 h-9 lg:w-10 lg:h-10 md:w-9 md:h-9 relative rounded-xl cursor-pointer transition duration-500 transform bg-purple-200 -translate-x-2 p-1 '>
            <Link to={`/upload/${albumId}/map`}>
              <img src='/map.png' alt='map' />
            </Link>
          </div>
        </div>

        <div className='text-center'>
          {Object.keys(albumDetail).length !== 0 && checkImageWithoutGps()}
        </div>
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
          <img
            className='absolute right-5 w-8 cursor-pointer opacity-100'
            // onClick={() => handleImageDelete(albumId, )}
            src='/rubbish-bin-white.png'
            alt='rubbish-bin'
            onClick={() => handleImageDelete()}
          />
        </div>

        <div className='sm:columns-1 md:columns-3 lg:columns-4 gap-[0.8rem] mx-5 space-y-4 pb-28 rounded-t-lg'>
          {Object.keys(albumDetail).length !== 0 &&
            albumDetail?.imageCloudData.map((image, idx) => {
              return (
                <>
                  <div className='break-inside-avoid shadow-2xl rounded-xl' key={idx}>
                    <div className='bg-black rounded-t-xl relative'>
                      <img
                        className='rounded-t-xl w-full object-contain hover:opacity-70 cursor-pointer duration-300 transition ease-in'
                        onClick={() => enlargeImg(image.url, image, idx)}
                        alt={image.imageId}
                        src={image.url}
                      />
                    </div>
                    <p className='text-center bg-white rounded-b-xl text-black'>
                      {idx + 1}
                    </p>
                  </div>
                </>
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
