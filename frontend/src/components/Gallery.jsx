import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbums } from '../redux/actions/album'
import { Link } from 'react-router-dom'
import VisibilitySensor from 'react-visibility-sensor'

function Gallery() {
  // const [imagesShownArray, setImagesShownArray] = useState('')

  const dispatch = useDispatch()
  // console.log('fetchAlbum in gallery: ', fetchAlbums())

  // useEffect(() => {
  //   setImagesShownArray(Array(albumList.length).fill(false))
  // }, [albumList])

  useEffect(() => {
    dispatch(
      fetchAlbums()
    ) /* .then(setImagesShownArray(Array(albumList.length).fill(false))) */
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
    // console.log(state.album)
    return state.album.albumList
  })
  console.log('albumList:', albumList)

  return (
    <>
      <h3>Gallery</h3>
      <div>---------------------------------------</div>
      <div>
        <Link to='/add'>Add Trip Album</Link>
      </div>
      <div>---------------------------------------</div>

      <div className='grid grid-cols-3 gap-1'>
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
        className={`relative  transition ease-in duration-300 ${
          show ? '' : 'translate-y-16 opacity-0'
        }`}
      >
        <Link to={`/upload/${album._id}`}>
          <div className=' absolute inset-0 z-10 flex transition duration-200 ease-in hover:opacity-0'>
            <div className='rounded-lg p-1 border absolute inset-0 bg-black opacity-70'></div>
            <div className='mx-auto text-white z-10 self-center uppercase tracking-widest text-sm'>
              Place of Visit: {album.place.placeName} ({album.images.length})
            </div>
          </div>
        </Link>

        <img
          className='rounded-lg p-1 bg-white border'
          src={`http://localhost:4000/${album.images[0]}`}
          alt={album.images[0]}
        />
      </div>
    </div>
  )
}

export default Gallery
