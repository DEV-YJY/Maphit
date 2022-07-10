import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbumDetail } from '../redux/actions/album'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
// import env from 'react-dotenv'

import {
  useLoadScript,
  LoadScript,
  GoogleMap,
  useJsApiLoader,
  Marker,
  MarkerClusterer,
  InfoWindow,
} from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '85vh',
}

export default function Map() {
  const dispatch = useDispatch()
  let params = useParams()
  const albumId = params.albumId
  const slider = useRef(null)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })

  const [hide, setHide] = useState(true)
  const [switchCenter, setSwitchCenter] = useState(false)
  const [zoom, setZoom] = useState(9)
  const [center, setCenter] = useState({
    lat: null,
    lng: null,
  })

  const [selectedMarker, setSelectedMarker] = useState(null)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

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

  const handleSelect = (img) => {
    let selectedImg = albumDetail.geolocation.filter(
      (imgOfInterest) => imgOfInterest.imageId === img
    )
    setCenter({
      lat: selectedImg[0].lat,
      lng: selectedImg[0].lng,
    })
    setSwitchCenter(!switchCenter)
    setZoom(13)
  }

  let topImageDisplay
  if (Object.keys(albumDetail).length !== 0) {
    topImageDisplay = albumDetail.imageCloudData.map((img) => {
      return (
        <div
          key={img.cloudinaryId}
          className='rounded-lg h-28 overflow-hidden mx-auto w-3/4'
        >
          <div
            className='rounded-lg flex justify-center w-full h-full '
            // extract url on click
            onClick={() => handleSelect(img.url)}
          >
            <img
              className='border rounded-lg object-scale-down w-4/5 h-full cursor-pointer'
              src={img.url}
              alt={img.url}
            />
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
      <Slider ref={slider} {...settings}>
        {topImageDisplay}
      </Slider>
      <button
        className='absolute left-px top-16'
        onClick={() => slider?.current?.slickPrev()}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          class='h-5 w-5'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fill-rule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z'
            clip-rule='evenodd'
          />
        </svg>
      </button>
      <button
        className='absolute right-px top-16'
        onClick={() => slider?.current?.slickNext()}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          class='h-5 w-5'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fill-rule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z'
            clip-rule='evenodd'
          />
        </svg>
      </button>
      {isLoaded ? (
        <div>
          <div className='flex'>
            <button onClick={() => setHide(!hide)}>{!hide ? 'REVEAL' : 'HIDE'}</button>
          </div>
          {Object.keys(albumDetail).length !== 0 && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={zoom}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {hide && (
                <MarkerClusterer options={clusterOptions}>
                  {(clusterer) =>
                    imageGeoData.map((location) => (
                      <Marker
                        key={location.imageId}
                        position={{ lat: location.lat, lng: location.lng }}
                        clusterer={clusterer}
                        onClick={() => setSelectedMarker(location)}
                        // icon={{
                        //   url: selectedMarker.imageId,
                        //   scaledSize: new window.google.maps.Size(80, 60),
                        // }}
                        icon={{
                          url: '/photo.png',
                          scaledSize: new window.google.maps.Size(40, 40),
                        }}
                      />
                    ))
                  }
                </MarkerClusterer>
              )}
              {selectedMarker && (
                <InfoWindow
                  position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <img
                    className='w-64'
                    src={selectedMarker.imageId}
                    alt={selectedMarker.imageId}
                  />
                </InfoWindow>
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
