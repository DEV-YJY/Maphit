import React, { useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbumDetail } from '../redux/actions/album'
import env from 'react-dotenv'

import {
  useLoadScript,
  LoadScript,
  GoogleMap,
  useJsApiLoader,
  Marker,
} from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '95vh',
}

export default function Map() {
  const dispatch = useDispatch()
  let params = useParams()
  const albumId = params.albumId
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })

  const [hide, setHide] = useState(true)
  const [center, setCenter] = useState({
    lat: null,
    lng: null
  })

  ///////////////////////////////// Renders Google Map
  const [map, setMap] = useState(null)
  // const [toggleEachPhoto, setToggleEachPhoto] = useState(null)

  const onLoad = useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds(center)
    // map.fitBounds(bounds)
    setMap(map)
  }, [])


  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])
  /////////////////
  //////////////////////////////////
  
  useEffect(() => {
    dispatch(fetchAlbumDetail(albumId))
    console.log('albumdetail in useEffect: ', albumDetail)
  }, [])

  const albumDetail = useSelector((state) => state.album.albumDetail)
  console.log('AlbumDetail in map.jsx: ', albumDetail)

  const imageGeoData = useSelector((state) =>  {
    console.log('imageGeoData in map.jsx: ', state)
    return state.album.albumDetail.geolocation
  })
  // console.log(imageGeoData[0].lat)


  useEffect(() => {
    setCenter({
      lat: albumDetail.place.lat,
      lng: albumDetail.place.lng,
      })
  }, [])

  console.log('center: ', center)


  let imagePosition 
  if (imageGeoData[0]) {
    imagePosition = {
        lat: imageGeoData[0].lat,
        lng: imageGeoData[0].lng,
      }
  }
  // const imagePosition = {
  //   lat: imageGeoData[0].lat,
  //   lng: imageGeoData[0].lng,
  // }

  // let markerSize
  // if (new window.google()) {
  //   markerSize = new window.google.maps.Size(70, 50)
  // }

  ///////////////// not working
  const imgLocation = imageGeoData.map((img) => {
    // console.log(img.lat)
    return (
        <Marker 
          key={img.imageId} 
          position={{lat: img.lat, lng: img.lng}} 
          icon={{ url: (`http://localhost:4000/${img.imageId}`), scaledSize: new window.google.maps.Size(70, 50) }} 
        />
    )
  })

  const sideImageDisplay = albumDetail.images.map(img => {
    return (
      <div key={img.images}>
        <img src={`http://localhost:4000/${img}`} alt={img.images}/>
      </div>
    )
  })

  return (
    <div>
      <Link to={`/`}>Back to Gallery</Link> / <Link to={`/upload/${albumId}`}>Back to Album</Link>

      <div className='flex'>
        <div className='flex-col'>
          {sideImageDisplay}
        </div>

        {isLoaded ? (
        <>
          <button onClick={() => setHide(!hide)}>{!hide ? 'REVEAL' : 'HIDE'}</button>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={8}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {hide && imgLocation}
          </GoogleMap>
        </>
      ) : (
        <>
          <h1>is loading...</h1>
        </>
      )}
    </div>
  </div>
)}

