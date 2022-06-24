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
    return res.data.result
  })
  return {
    type: FETCH_ALBUMS,
    payload: req,
  }
}
