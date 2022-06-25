import axios from 'axios'
import {
  FETCH_ALBUMS,
  FETCH_ALBUM_DETAIL,
  ADD_ALBUM,
  REMOVE_IMAGE,
  UPLOAD_IMAGE,
} from './type'

// ACTION CREATORS
export const fetchAlbums = () => {
  const res = axios.get('/albums').then((res) => {
    // console.log('fetch Albums: ', res.data.result)
    // return res.data.result[0].images
    return res.data
  })
  // console.log('payload: ', res)
  return {
    type: FETCH_ALBUMS,
    payload: res,
  }
}

export const addAlbum = (data) => {
  const res = axios.post('/albums/add', data).then((res) => {
    // console.log('addAlbum: ', res)
    return res.data
  })
  // console.log('payload: ', res)
  return {
    type: ADD_ALBUM,
    payload: res,
  }
}

export const uploadImage = (albumId, data, configParam) => {
  const res = axios.put(`/albums/upload/${albumId}`, data, configParam).then((res) => {
    // console.log(res.data)
    return res.data
  })
  return {
    type: UPLOAD_IMAGE,
    payload: res,
  }
}

export const removeImage = (albumId, imageName) => {
  const res = axios
    // fileName = what is defined in the routes
    .put(`/albums/removeImage/${albumId}`, { fileName: imageName })
    .then((res) => {
      // console.log(res.data)
      return res.data
    })
  return {
    type: REMOVE_IMAGE,
    payload: res,
  }
}

export const fetchAlbumDetail = (albumId) => {
  const res = axios.get(`/albums/${albumId}`).then((res) => {
    return res.data
  })
  return {
    type: FETCH_ALBUM_DETAIL,
    payload: res,
  }
}
