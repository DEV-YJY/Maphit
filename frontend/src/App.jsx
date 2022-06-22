import React from 'react'
import Album from './components/Album'
import {ToastContainer} from 'react-toastify'
import {Routes, Route} from 'react-router-dom'
import Gallery from './components/Gallery'
import UploadImage from './components/UploadImage'

function App() {
  return (
    <div>
      <ToastContainer/>
      <div className='gallery-container'>
        <Routes>
          <Route path='/' element={<Gallery/>} />
          <Route path='/add' element={<Album/>} />
          <Route path='/upload/:albumId' element={<UploadImage/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
