import React from 'react'
import AddAlbum from './components/AddAlbum'
import Gallery from './components/Gallery'
import ImageUpload from './components/ImageUpload'
import Map from './components/Map'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div>
      <ToastContainer/>
      <div className='gallery-container'>
        <Routes>
          <Route path='/' element={<Gallery/>} />
          <Route path='/add' element={<AddAlbum/>} />
          <Route path='/upload/:albumId' element={<ImageUpload/>} />
          <Route path='/upload/:albumId/map' element={<Map />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
