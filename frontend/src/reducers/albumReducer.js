import { fetchAlbumDetail } from '../actions/album'
import {
  FETCH_ALBUMS,
  FETCH_ALBUM_DETAIL,
  ADD_ALBUM,
  REMOVE_IMAGE,
  UPLOAD_IMAGE,
} from '../actions/type'

// INITIAL STATE
const initialState = {
  albumList: [],
  albumDetail: {},
}

// REDUCER
const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALBUMS:
      return {
        albumList: [...action.payload.result],
      }
    case FETCH_ALBUM_DETAIL:
      return {
        albumDetail: action.payload.result,
      }
    case UPLOAD_IMAGE:
      return {
        albumDetail: action.payload.result,
      }
    case REMOVE_IMAGE:
      return {
        albumDetail: action.payload.result,
      }
    default:
      // console.log('albumReducer: ', state)
      return state
  }
}

export default albumReducer
