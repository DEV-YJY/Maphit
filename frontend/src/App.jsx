import React from 'react'
import AddAlbum from './components/AddAlbum'
import Gallery from './components/Gallery'
import Album from './components/Album'
import Map from './components/Map'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'

function App() {
  return (
    <div className='text-black bg-gray-100 dark:text-darkModeTxt dark:bg-darkModeBg transition duration-700'>
      <Nav />
      <ToastContainer />
      <div>
        {/* // isAuthenticated ? render below otherwise : render /auth */}
        <Routes>
          <Route path='/' element={<Gallery />} />
          <Route path='/add' element={<AddAlbum />} />
          <Route path='/upload/:albumId' element={<Album />} />
          <Route path='/upload/:albumId/map' element={<Map />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
