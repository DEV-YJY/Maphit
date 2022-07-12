import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbums } from '../redux/actions/album'
import { Link, useNavigate } from 'react-router-dom'
import VisibilitySensor from 'react-visibility-sensor'

function Gallery() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // console.log('fetchAlbum in gallery: ', fetchAlbums())

  // useEffect(() => {
  //   setImagesShownArray(Array(albumList.length).fill(false))
  // }, [albumList])

  useEffect(() => {
    dispatch(fetchAlbums())
    // console.log('useEffet fired')
  }, [])

  // const imagesVisibleChange = (idx, isVisible) => {
  //   if (isVisible) {
  //     setImagesShownArray((currentImagesShownArray) => {
  //       currentImagesShownArray[idx] = true
  //       return [...currentImagesShownArray]
  //     })
  //   }
  // }

  const handleDirectToAlbum = (album) => {
    navigate(`/upload/${album}`)
  }

  const albumList = useSelector((state) => {
    // console.log('state inside albumList: ', state.album)
    return state.album.albumList
  })
  // console.log('albumList:', albumList)
  // console.log('albumList')
  // console.log(albumList)
  return (
    <>
      <h3>Gallery</h3>
      <div className='flex justify-center'>
        <Link to='/add'>
          <img src='/add.png' alt='add-icon' />
        </Link>
      </div>
      {/* sm:columns-2 md:columns-3 lg:columns-4 */}
      {/* grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 sm:justify-center gap-3 */}
      <div className='flex flex-wrap justify-center items-center place-items-start'>
        {albumList !== [] &&
          albumList.map((album, idx) => (
            <div
              onClick={() => handleDirectToAlbum(album._id)}
              className='bg-black relative flex flex-wrap items-center cursor-pointer mx-7 my-7 justify-center m-3 overflow-hidden shadow-xl w-60 h-60 rounded-2xl group'
            >
              {album.imageCloudData.length > 0 ? (
                // <Link to={`/upload/${album._id}`}>
                <>
                  <img
                    className='object-cover group-hover:opacity-50 group-hover:scale-150 w-full h-full transition-all duration-500 ease-in-out transform bg-center bg-cover'
                    src={
                      album.imageCloudData[
                        Math.floor(Math.random() * album.imageCloudData.length)
                      ].url
                    }
                    alt={
                      album.imageCloudData[
                        Math.floor(Math.random() * album.imageCloudData.length)
                      ].cloudinaryId
                    }
                  />
                  <p className='text-center group-hover:scale-100 absolute uppercase text-2xl font-black transition-all duration-500 ease-in-out transform scale-150 text-gray-50 opacity-70 '>
                    {album.name}
                    <br /> <br />
                    {album.place.placeName}
                    {/* .split(',').slice(-2).join(',') */}
                  </p>
                </>
              ) : (
                // </Link>
                <>
                  <div className='bg-white px-5 py-1 rounded-2xl flex flex-col items-center'>
                    <img
                      className='mt-10 w-8 text-center'
                      src='/empty.png'
                      alt='empty-icon'
                    />
                    <p className='text-xl mb-4'>This Album is Empty</p>
                    <p className='text-md mb-20'>Click to Add Some Photos</p>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </>
  )
}
function GridGalleryCard({ album, show }) {
  return (
    <div>
      <div>Album name: {album.name}</div>
      <div
        className={`max-w-[336px] relative top-1/2 transform transition ease-in opacity-100 duration-500 ${
          show ? '' : 'translate-y-16 opacity-0'
        }`}
      >
        <Link to={`/upload/${album._id}`}>
          <div className='shadow-xl rounded-2x absolute inset-0 z-10 flex transition duration-200 ease-in'>
            <div className=' flex items-center justify-center mx-auto text-white z-10 self-center uppercase text-center tracking-widest text-sm rounded-2xl p-1 border absolute inset-0 bg-black ease-in opacity-0 hover:opacity-70 duration-300 transition'>
              {album.place.placeName} ({album.imageCloudData.length})
            </div>
          </div>
        </Link>

        {album.imageCloudData.length > 0 ? (
          <img
            className='rounded-2xl p-1 bg-white border hover:scale-125'
            src={album.imageCloudData[0].url}
            alt={album.imageCloudData[0].cloudinaryId}
          />
        ) : (
          <div className='h-28 border'>
            <p>This Album is Empty</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Gallery
