import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbums } from '../redux/actions/album'
import { Link } from 'react-router-dom'
import VisibilitySensor from 'react-visibility-sensor'

function Gallery() {
  const dispatch = useDispatch()
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

  const albumList = useSelector((state) => {
    // console.log('state: ', state)
    return state.album.albumList
  })
  console.log('albumList:', albumList)
  // imageCloudData not being read from the state
  // console.log(albumList.imageCloudData[0])

  return (
    <>
      <h3>Gallery</h3>
      <div>---------------------------------------</div>
      <div>
        <Link to='/add'>Add Trip Album</Link>
      </div>
      <div>---------------------------------------</div>
      <div className='grid grid-cols-3 gap-3 place-items-center items-start'>
        {albumList !== [] &&
          albumList.map((album, idx) => (
            // <VisibilitySensor
            //   key={idx}
            //   partialVisibility={true}
            //   offset={{ bottom: 80 }}
            //   onChange={({ isVisible }) => imagesVisibleChange(idx, isVisible)}
            // >
            <GridGalleryCard
              album={album}
              show={true} /* show={imagesShownArray[idx]}  */
            />
            // </VisibilitySensor>
          ))}
      </div>
    </>
  )
}
// block duration-500 relative transform transition-all translate-y-12 ease-out
// top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
function GridGalleryCard({ album, show }) {
  return (
    <div>
      <div>Album name: {album.name}</div>
      <div
        className={`relative top-1/2 transform transition ease-in opacity-100 duration-500 ${
          show ? '' : 'translate-y-16 opacity-0'
        }`}
      >
        <Link to={`/upload/${album._id}`}>
          <div className='absolute inset-0 z-10 flex transition duration-200 ease-in'>
            <div className='flex items-center justify-center mx-auto text-white z-10 self-center uppercase  text-center tracking-widest text-sm rounded-lg p-1 border absolute inset-0 bg-black ease-in opacity-0 hover:opacity-70 duration-300 transition'>
              {/* <div className='mx-auto text-white z-10 self-center uppercase tracking-widest text-sm opacity-0 hover:opacity-100'> */}
              {album.place.placeName} ({album.imageCloudData.length})
            </div>
          </div>
        </Link>
        {/*         Error handling required: component breaks when
        theres no photo in the album.
        Below breaks
 */}
        {album.imageCloudData.length > 0 ? (
          <img
            className='rounded-lg p-1 bg-white border'
            src={album.imageCloudData[0].url}
            alt={album.imageCloudData[0].cloudinaryId}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export default Gallery
