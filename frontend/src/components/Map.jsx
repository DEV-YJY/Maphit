import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbumDetail } from '../redux/actions/album'

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

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

export default function Map() {
  const dispatch = useDispatch()
  let params = useParams()
  const albumId = params.albumId

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAPBNI3ndJDJk0KwEXWI35mWYMKkB09G0A',
  })

  ///////////////////////////////// Renders Google Map
  const [map, setMap] = useState(null)
  const [hide, setHide] = useState(true)

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
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

  const imgLocation = imageGeoData.map((img) => {
    // console.log(img.lat)
    return (
      <Marker 
        key={img.imageId} 
        position={{lat: img.lat, lng: img.lng}} 
        icon={{ url: `http://localhost:4000/${img}`, scaledSize: new window.google.maps.Size(70, 50) }} 
      />
    )
  })


  return isLoaded ? (
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
        {!hide && imgLocation[0]} 
      </GoogleMap>
    </>
  ) : (
    <>
      <h1>is loading...</h1>
    </>
  )
}
