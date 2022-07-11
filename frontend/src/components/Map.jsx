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

  const [hideAllMarkers, setHideAllMarkers] = useState(true)
  const [revealImages, setRevealImages] = useState(true)
  const [switchCenter, setSwitchCenter] = useState(false)
  const [zoom, setZoom] = useState(9)
  const [center, setCenter] = useState({
    lat: null,
    lng: null,
  })

  const [selectedMarker, setSelectedMarker] = useState(null)

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    rows: 1,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          rows: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
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
          className='rounded-lg h-28 overflow-hidden mx-auto w-3/4 shadow-lg '
        >
          <div
            className=' rounded-lg flex justify-center w-full h-full '
            // extract url on click
            onClick={() => handleSelect(img.url)}
          >
            <img
              className='border border-black rounded-lg object-cover w-4/5 h-full cursor-pointer bg-gray-100'
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
    gridSize: 50,
    imageSizes: [80],
    // need to change the font size within the cluster
    // styles: [
    //   {
    //     fontSize: [150],
    //   },
    // ],
  }

  return (
    <div className='flex flex-col mx-auto justify-center lg:w-11/12 md:w-11/12 '>
      <div className='flex justify-center'>
        <Link className='flex mr-5' to={`/`}>
          <img className='w-6' src='/arrow-left.png' alt='arrow-left' />
          <p>To Gallery</p>
        </Link>
        <Link className='flex ml-5' to={`/upload/${albumId}`}>
          <p>To Album</p>
          <img className='w-6' src='/arrow-right.png' alt='arrow-right' />
        </Link>
      </div>

      <Slider ref={slider} {...settings}>
        {topImageDisplay}
      </Slider>
      <div className='flex justify-center my-0'>
        <img
          className='w-6 mr-24 cursor-pointer z-50'
          onClick={() => slider?.current?.slickPrev()}
          src='/arrow-left.png'
          alt='arrow-left'
        />
        <img
          className='w-6 cursor-pointer z-50'
          onClick={() => slider?.current?.slickNext()}
          src='/arrow-right.png'
          alt='arrow-right'
        />
      </div>
      {isLoaded ? (
        <div className='mt-0'>
          <div className='flex justify-around'>
            <button onClick={() => setHideAllMarkers(!hideAllMarkers)}>
              {!hideAllMarkers ? 'Reval Markers' : 'Hide Markers'}
            </button>
            <button onClick={() => setRevealImages(!revealImages)}>
              {!revealImages ? 'Switch to Images' : 'Switch to Markers'}
            </button>
          </div>
          {Object.keys(albumDetail).length !== 0 && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={zoom}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {hideAllMarkers && (
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
                          url: revealImages ? '/photo.png' : location.imageId,
                          scaledSize: revealImages
                            ? new window.google.maps.Size(40, 40)
                            : new window.google.maps.Size(80, 60),
                        }}
                      />
                    ))
                  }
                </MarkerClusterer>
              )}
              {selectedMarker && (
                <InfoWindow
                  className=''
                  position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <img
                    className=''
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
    </div>
  )
}
