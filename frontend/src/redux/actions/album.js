import axios from 'axios'
import {
  FETCH_ALBUMS,
  FETCH_ALBUM_DETAIL,
  ADD_ALBUM,
  DELETE_ALBUM,
  REMOVE_IMAGE,
  UPLOAD_IMAGE,
  UPLOAD_GEODATA,
  UPLOAD_IMAGE_WITH_GEO,
} from './type'

// ACTION CREATORS
export const fetchAlbums = async () => {
  const res = await axios.get('/albums')
  // .then((res) => {
  // console.log('fetch Albums: ', res.data.result)
  // console.log(res)
  //   return res.data.result
  // })
  return {
    type: FETCH_ALBUMS,
    payload: res.data.result,
  }
}

export const addAlbum = async (data) => {
  // console.log(coordinates)
  const res = await axios.post('/albums/add', data)
  // .then((res) => {
  // console.log('addAlbum: ', res)
  // console.log('addAlubm-data: ', data)
  //   return res.data
  // })
  // console.log('payload: ', res)
  return {
    type: ADD_ALBUM,
    payload: res.data,
  }
}

export const deleteAlbum = async (albumId) => {
  const res = await axios.delete(`/albums/delete/${albumId}`)
  // .then((res) => {
  // console.log('resData from deleteAlbum action: ', res.data)
  console.log(res.data)
  //   return res.data
  // })
  return {
    type: DELETE_ALBUM,
    payload: res.data,
  }
}

export const uploadImageWithGeoData = async (albumId, data, configParam) => {
  const res = await axios.put(`/albums/upload/${albumId}`, data, configParam)
  const resData = res.data.result.images
  const resGeo = await axios.put(`/albums/geoUpdate/${albumId}`)
  // console.log('this is resGeo: ', resGeo)
  let resGeoData
  if (resGeo.data.result.geolocation !== [false]) {
    resGeoData = resGeo.data.result.geolocation
  }
  const resGeoPlace = resGeo.data.result.place
  // console.log('this is resgeodata: ', resGeoData)

  return {
    type: UPLOAD_IMAGE_WITH_GEO,
    payload: {
      res: resData,
      resGeoData,
      resGeoPlace,
      resGeo,
    },
  }
}

export const uploadImage = (albumId, data, configParam) => {
  const res = axios.put(`/albums/upload/${albumId}`, data, configParam)
  // .then((res) => {
  // console.log('res.data from uploadImage action: ', res.data)
  // return res.data
  // })
  return {
    type: UPLOAD_IMAGE,
    payload: res.data,
  }
}

export const removeImage = async (albumId, imageName) => {
  const res = await axios
    // fileName = what is defined in the routes
    .put(`/albums/removeImage/${albumId}`, { fileName: imageName.imageName })
  // .then((res) => {
  //   console.log('res.data from action: ', res)
  //   return res.data
  // })
  return {
    type: REMOVE_IMAGE,
    payload: res.data,
  }
}

export const fetchAlbumDetail = async (albumId) => {
  const res = await axios.get(`/albums/${albumId}`)
  // .then((res) => {
  // console.log('albumdetail from action', res)
  //   return res.data.result
  // })
  return {
    type: FETCH_ALBUM_DETAIL,
    payload: res.data.result,
  }
}

// export const uploadGeoData = (albumId) => {
//   return async (dispatch) => {
//     const res = await axios.put(`/albums/geoUpdate/${albumId}`)
//     const resData = res.data.result.geolocation
//     // console.log(resData)
//     await dispatch({
//       type: UPLOAD_GEODATA,
//       payload: resData,
//     })
//     dispatch(uploadGeoData(albumId))
//   }
// }

// export const uploadGeoData = async (albumId) => {
//   const res = await axios.put(`/albums/geoUpdate/${albumId}`)
//   const resData = res.data.result.geolocation
//   // console.log(resData)
//   return {
//     type: UPLOAD_GEODATA,
//     payload: resData,
//   }
// }

// Client ==> API ==> DB ==> API ==> Client
//       noGeo   Geo     Geo     Geo
