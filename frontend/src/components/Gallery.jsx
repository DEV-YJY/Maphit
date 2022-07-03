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
  // console.log('albumList:', albumList)

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
              <div key={album._id}>
                <div>Place of Visit: {album.place.placeName}</div>
                <div>Album name: {album.name}</div>
                <div>
                  <Link to={`/upload/${album._id}`}>View Album</Link> (
                  {album.images.length}) photos
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
