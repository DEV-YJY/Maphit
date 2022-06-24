import React from 'react'
import Album from './components/Album'
import {ToastContainer} from 'react-toastify'
import {Routes, Route} from 'react-router-dom'
import Gallery from './components/Gallery'
import UploadImage from './components/UploadImage'
import Map from './components/Map'

function App() {
  return (
    <div>
      <ToastContainer/>
      <div className='gallery-container'>
        <Routes>
          <Route path='/' element={<Gallery/>} />
          <Route path='/add' element={<Album/>} />
          <Route path='/upload/:albumId' element={<UploadImage/>} />
          <Route path='/upload/:albumId/map' element={<Map />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
