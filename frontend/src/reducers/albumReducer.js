import { fetchAlbumDetail } from '../actions/album'
import {
  FETCH_ALBUMS,
  FETCH_ALBUM_DETAIL,
  ADD_ALBUM,
  REMOVE_IMAGE,
  UPLOAD_IMAGE,
  FETCH_GEODATA,
} from '../actions/type'

// INITIAL STATE
const initialState = {
  albumList: [],
  albumDetail: null,
  imageGeoData: null,
}

// REDUCER
const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALBUMS:
      return {
        ...state,
        albumList: [...action.payload.result],
      }
    case FETCH_ALBUM_DETAIL:
      return {
        ...state,
        albumDetail: action.payload.result,
        imageGeoData: action.payload.result,
      }
    case UPLOAD_IMAGE:
      return {
        ...state,
        albumDetail: action.payload.result,
      }
    case REMOVE_IMAGE:
      return {
        ...state,
        albumDetail: action.payload.result,
      }
    // something is not right here
    case FETCH_GEODATA:
      return {
        ...state,
        imageGeoData: action.payload.result,
      }
    default:
      // console.log('albumReducer: ', state)
      return state
  }
}

export default albumReducer
