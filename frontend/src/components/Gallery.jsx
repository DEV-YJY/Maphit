import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbums, deleteAlbum } from '../redux/actions/album'
import { Link } from 'react-router-dom'

function Gallery() {
  const dispatch = useDispatch()
  // console.log('fetchAlbum in gallery: ', fetchAlbums())

  useEffect(() => {
    dispatch(fetchAlbums())
    // console.log('useEffect called')
  }, [])

  const albumList = useSelector(state => {
    // console.log('state: ', state)
    return state.album.albumList
  })
  console.log('albumList:', albumList)

  // console.log(useSelector(state => state.album.result))
  // console.log('albumList.album.albumList: ', albumList.album.albumList)
  return (
    <>
      <div>
        <Link to='/add'>Add Trip Album</Link>
      </div>
      <div>---------------------------------------</div>
      <div>
        {albumList !== [] && albumList.map(album => {
          return (
            <div key={album._id}>
              <div>Place of Visit: {album.place.placeName}</div>
              <div>Album name: {album.name}</div>
              <div><Link to={`/upload/${album._id}`}>View Album</Link></div>
              <div>---------------------------------------</div>
            </div>
          )
        })}
      </div>
      {/* name desc images.length */}
    </>
  )
}

export default Gallery