import React, { useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbumDetail } from '../redux/actions/album'
// import env from 'react-dotenv'

import {
  useLoadScript,
  LoadScript,
  GoogleMap,
  useJsApiLoader,
  Marker,
  MarkerClusterer,
} from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '85vh',
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
    lng: null,
  })

  ///////////////////////////////// Renders Google Map
  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])
  /////////////////
  //////////////////////////////////

  const albumDetail = useSelector((state) => state.album.albumDetail)
  console.log('AlbumDetail in map.jsx: ', albumDetail)

  const imageGeoData = useSelector((state) => {
    console.log('imageGeoData in map.jsx: ', state)
    return state.album.albumDetail.geolocation
  })

  useEffect(() => {
    dispatch(fetchAlbumDetail(albumId))
    console.log('albumdetail in useEffect: ', albumDetail)
  }, [])

  // console.log(imageGeoData[0].lat)

  useEffect(() => {
    setCenter({
      lat: Object.keys(albumDetail).length !== 0 && albumDetail.place.lat,
      lng: Object.keys(albumDetail).length !== 0 && albumDetail.place.lng,
    })
  }, [albumDetail])

  console.log('center: ', center)

  // let markerSize
  // if (new window.google()) {
  //   markerSize = new window.google.maps.Size(70, 50)
  // }

  ///////////////// not working
  // const imgLocation = imageGeoData?.map((img) => {
  //   return (
  //     <Marker
  //       key={img.imageId}
  //       position={{ lat: img.lat, lng: img.lng }}
  //       icon={{
  //         url: `http://localhost:4000/${img.imageId}`,
  //         scaledSize: new window.google.maps.Size(70, 50),
  //       }}
  //     />
  //   )
  // })

  let sideImageDisplay
  if (Object.keys(albumDetail).length !== 0) {
    sideImageDisplay = albumDetail.imageCloudData.map((img) => {
      return (
        <div key={img.cloudinaryId} className=''>
          <div className='c'>
            <img src={img.url} alt={img.url} />
          </div>
        </div>
      )
    })
  }

  const clusterOptions = {
    averageCenter: true,
    gridSize: 30,
  }

  return (
    <>
      <Link to={`/`}>Back to Gallery</Link> /{' '}
      <Link to={`/upload/${albumId}`}>Back to Album</Link>
      <div className='flex'>{sideImageDisplay}</div>
      {isLoaded ? (
        <div>
          <button onClick={() => setHide(!hide)}>{!hide ? 'REVEAL' : 'HIDE'}</button>
          {Object.keys(albumDetail).length !== 0 && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={9}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {/* {hide && imgLocation} */}
              {hide && (
                <MarkerClusterer options={clusterOptions}>
                  {(clusterer) =>
                    imageGeoData.map((location) => (
                      <Marker
                        key={location.imageId}
                        position={{ lat: location.lat, lng: location.lng }}
                        icon={{
                          url: location.imageId,
                          scaledSize: new window.google.maps.Size(80, 60),
                        }}
                        clusterer={clusterer}
                      />
                    ))
                  }
                </MarkerClusterer>
              )}
            </GoogleMap>
          )}
        </div>
      ) : (
        <div>
          <h1>is loading...</h1>
        </div>
      )}
    </>
  )
}
