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
  const req = axios.get('/albums').then((res) => {
    // console.log('fetch Albums: ', res.data.result)
    // return res.data.result[0].images
    return res.data
  })
  // console.log('payload: ', req)
  return {
    type: FETCH_ALBUMS,
    payload: req,
  }
}

export const addAlbum = (data) => {
  const req = axios.post('/albums/add', data).then((res) => {
    // console.log('addAlbum: ', res)
    return res.data
  })
  // console.log('payload: ', req)
  return {
    type: ADD_ALBUM,
    payload: req,
  }
}

export const uploadImage = (albumId, data, configParam) => {
  const req = axios.put(`/albums/upload/${albumId}`, data, configParam).then((res) => {
    return res.data
  })
  return {
    type: UPLOAD_IMAGE,
    payload: req,
  }
}
