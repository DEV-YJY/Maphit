import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbums, deleteAlbum } from '../redux/actions/album'
import { Link } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'

function Gallery() {
  const dispatch = useDispatch()
  // console.log('fetchAlbum in gallery: ', fetchAlbums())

  useEffect(() => {
    dispatch(fetchAlbums())
    // console.log('useEffect called')
  }, [])

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
      <div>
        {albumList !== [] &&
          albumList.map((album) => {
            return (
              <div className='grid grid-cols-3 gap-1' key={album._id}>
                <div>Album name: {album.name}</div>
                <div>
                  <Link to={`/upload/${album._id}`}>View Album</Link> (
                  {album.images.length}) photos
                </div>
                <div className='relative'>
                  <div className='absolute inset-0 z-10 flex transition duration-200 ease-in hover:opacity-0'>
                    <div className='absolute inset-0 bg-black opacity-70'></div>
                    <div className='mx-auto text-white z-10 self-center uppercase tracking-widest text-sm'>
                      Place of Visit: {album.place.placeName}
                    </div>
                  </div>
                  <img src={`http://localhost:4000/${album.images[0]}`} />
                </div>
                <div>---------------------------------------</div>
              </div>
            )
          })}
      </div>
    </>
  )
}

export default Gallery
