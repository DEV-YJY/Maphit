import React from 'react'
import AddAlbum from './components/AddAlbum'
import Gallery from './components/Gallery'
import Album from './components/Album'
import Map from './components/Map'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Login from './components/Login'
import Signup from './components/Signup'
import { useAuthContext } from './hook/useAuthContext'

function App() {
  const { user } = useAuthContext()

  return (
    <div className='font-margarine text-black bg-gray-100 dark:text-darkModeTxt dark:bg-darkModeBg transition duration-700'>
      {/* <Nav /> */}
      <ToastContainer />
      <div>
        {/* // isAuthenticated ? render below otherwise : render /auth */}
        <Routes>
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
          <Route path='/' element={user ? <Gallery /> : <Navigate to='/login' />} />
          <Route path='/add' element={<AddAlbum />} />
          <Route path='/upload/:albumId' element={<Album />} />
          <Route path='/upload/:albumId/map' element={<Map />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App
