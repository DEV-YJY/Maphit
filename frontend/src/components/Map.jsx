import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbumDetail } from '../actions/album'

import {
  useLoadScript,
  LoadScript,
  GoogleMap,
  useJsApiLoader,
  Marker,
} from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '100vh',
}

const center = {
  lat: 1.29,
  lng: 103.852,
}

const mbs = {
  lat: 1.2823,
  lng: 103.8585
}

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAPBNI3ndJDJk0KwEXWI35mWYMKkB09G0A',
  })

  const dispatch = useDispatch()
  let params = useParams()
  const albumId = params.albumId

  useEffect(() => {
    dispatch(fetchAlbumDetail(albumId))
  }, [])
  
  const albumDetail = useSelector(state => state.album.albumDetail)
  // console.log('map: ', albumDetail)


  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  // const imgLocation = albumDetail.images.map(img => {
  //   return (
  //     <Marker
  //       position={mbs}
  //       icon={{url: (`http://localhost:4000/${img}`)}}
  //     />
  //   )
  // })

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* {imgLocation} */}
      {/* <Marker 
        position={mbs} 
        icon={{url: (`http://localhost:4000/${albumDetail.images[2]}`)}} 
      /> */}
    </GoogleMap>
  ) : (
    <>
      <h1>is loading...</h1>
    </>
  )
}
