import React from 'react'
import { useParams } from 'react-router-dom'

function Map() {

  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  const params = useParams()



  return (
    <div>Map</div>
  )
}

export default Map