import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
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

const center = {
  lat: 1.29,
  lng: 103.852,
}

export default function Map() {
  const dispatch = useDispatch()
  let params = useParams()
  const albumId = params.albumId
  
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  let api = 'AIzaSyAPBNI3ndJDJk0KwEXWI35mWYMKkB09G0A'

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })

  const [hide, setHide] = useState(true)
  
  ///////////////////////////////// Renders Google Map
  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds(center)
    // map.fitBounds(bounds)
    setMap(map)
  }, [])


  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])
//////////////////////////////////

  useEffect(() => {
    dispatch(fetchAlbumDetail(albumId))
  }, [])

  const albumDetail = useSelector((state) => state.album.albumDetail)
  console.log('AlbumDetail in map.jsx: ', albumDetail)

  const imageGeoData = useSelector((state) =>  {
    console.log('Geolocation in map.jsx: ', state.album.albumDetail.geolocation)
    return state.album.albumDetail.geolocation
  })
  // console.log(imageGeoData[0].lat)

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
  // const imgLocation = imageGeoData.map((img) => {
  //   // console.log(img.lat)
  //   return (
  //     <Marker 
  //       key={img.imageId} 
  //       position={{lat: img.lat, lng: img.lng}} 
  //       icon={{ url: `http://localhost:4000/${img}`, scaledSize: new window.google.maps.Size(70, 50) }} 
  //     />
  //   )
  // })

  const sideImageDisplay = albumDetail.images.map(img => {
    return (
      <div key={img.images}>
        <img src={`http://localhost:4000/${img}`} alt={img.images}/>
      </div>
    )
  })

  return (
    <div className='flex'>
      <div className='flex-col'>
        {sideImageDisplay}
      </div>

      {isLoaded ? (
      <>
        <button onClick={() => setHide(!hide)}>{hide ? 'REVEAL' : 'HIDE'}</button>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {!hide && <Marker
            position={center} 
            icon={{url: (`http://localhost:4000/${albumDetail.images[2]}`), scaledSize: new window.google.maps.Size(70, 50) }} 
          />}

          
          {/* {!hide && imgLocation[0]}  */}

          {/* // does not work */}
          {/* {imageGeoData.map(img => (
            <Marker 
              key={img.imageId} 
              position={{lat: img.lat, lng: img.lng}}
              icon={{ url: `http://localhost:4000/${img}`, scaledSize: new window.google.maps.Size(70, 50) }} 
            />
          ))} */}

          {/* // it works + new window.google.maps */}
          <Marker 
            position={{lat: imageGeoData[0].lat, lng: imageGeoData[0].lng } }
            icon={{url: (`http://localhost:4000/${albumDetail.images[2]}`), scaledSize: new window.google.maps.Size(70, 50) }} 
          />


          {/* Example */}
          {/* <Map
                >
                  {locations.map((loc, i) => (
                    <Marker key={i} position={{ lat: loc.lat, lng: loc.lng }} />
                  ))}
              </Map> */}


        </GoogleMap>
      </>
    ) : (
      <>
        <h1>is loading...</h1>
      </>
    )}
  </div>
)}

