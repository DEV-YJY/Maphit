import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbums } from '../actions/album'
import { Link } from 'react-router-dom'

function Gallery() {
  const dispatch = useDispatch()
  console.log('fetchAlbum in gallery: ', fetchAlbums())

  useEffect(() => {
    dispatch(fetchAlbums())
    console.log('useEffect called')
  }, [])

  const albumList = useSelector(state => state.album.albumList)
  console.log(albumList)
  // console.log(useSelector(state => state.album.result))
  // console.log('albumList.album.albumList: ', albumList.album.albumList)
  return (
    <>
      {/* <div>
        {albumList.map((album, idx) => {
          return (
            <div key={idx + 1}>
              <div>{album.name}</div>
              <button><a href='/'>button</a></button>
            </div>
          )
        })}
      </div> */}
      <h1>gallery rendered</h1>
      {/* name desc images.length */}
      <Link to='/upload/123312/map'>Button</Link>
    </>
  )
}

export default Gallery