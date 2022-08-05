import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbums } from '../redux/actions/album'
import { Link, useNavigate } from 'react-router-dom'
import useDarkMode from '../hook/useDarkMode'
import { useAuthContext } from '../hook/useAuthContext'
import axios from 'axios'
import { FETCH_ALBUMS } from '../redux/actions/type'

function Gallery() {
  const [colourTheme, setTheme] = useDarkMode()
  const [number, setNumber] = React.useState(0)
  const { user } = useAuthContext()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const getAllAlbums = async () => {
      const res = await axios.get('albums', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      const json = await res.data.result
      if (res.status === 200) {
        dispatch({ type: 'FETCH_ALBUMS', payload: json })
      }
    }
    if (user) {
      console.log('getAllAlbums fired')
      getAllAlbums()
    }
  }, [user])

  const handleDirectToAlbum = (album) => {
    navigate(`/upload/${album}`)
  }

  const albumList = useSelector((state) => {
    // console.log('state inside albumList: ', state.album)
    console.log('state inside albumList: ', state)
    return state.album.albumList
  })
  // console.log('albumList:', albumList)
  // console.log('albumList')
  // console.log(albumList)

  return (
    <>
      <div className='fixed top-3 right-9'>
        {colourTheme === 'light' ? (
          <div
            className='w-6 h-6 md:w-7 md:h-7 relative rounded-full transition duration-500 transform bg-yellow-400 -translate-x-2 p-1'
            onClick={() => setTheme(colourTheme)}
          >
            <img src='/sun.png' alt='sun' />
          </div>
        ) : (
          <div
            className='w-6 h-6 md:w-7 md:h-7 relative rounded-full transition duration-500 transform bg-gray-400 -translate-x-2 p-1'
            onClick={() => setTheme(colourTheme)}
          >
            <img src='/moon.png' alt='moon' />
          </div>
        )}
      </div>

      <div className='flex justify-center pt-10'>
        <Link to='/add'>
          <img className='w-12' src='/add-album.png' alt='add-icon' />
        </Link>
      </div>
      <div className='flex min-h-screen flex-wrap justify-center items-center place-items-start'>
        {albumList !== [] &&
          albumList.map((album, idx) => (
            <div
              onClick={() => handleDirectToAlbum(album._id)}
              className='bg-black border relative flex flex-wrap items-center cursor-pointer mx-7 my-7 justify-center m-3 overflow-hidden shadow-xl w-60 h-60 rounded-2xl group'
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
                  <div className='bg-white text-black px-7 py-2 rounded-2xl flex flex-col items-center'>
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
