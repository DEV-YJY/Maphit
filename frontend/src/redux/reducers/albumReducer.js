import {
  FETCH_ALBUMS,
  FETCH_ALBUM_DETAIL,
  ADD_ALBUM,
  REMOVE_IMAGE,
  UPLOAD_IMAGE,
  UPLOAD_GEODATA,
  UPLOAD_IMAGE_WITH_GEO,
} from '../actions/type'

// INITIAL STATE
export const initialState = {
  albumList: [],
  albumDetail: {},
}

// REDUCER
const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALBUMS:
      return {
        ...state,
        albumList: action.payload,
      }
    case FETCH_ALBUM_DETAIL:
      return {
        ...state,
        albumDetail: action.payload,
      }
    case UPLOAD_IMAGE:
      return {
        ...state,
        albumDetail: action.payload.result,
      }
    case UPLOAD_IMAGE_WITH_GEO:
      return {
        // ...state,
        albumDetail: {
          ...state.albumDetail,
          // images: action.payload.res,
          geolocation: action.payload.resGeoData,
          place: action.payload.resGeoPlace,
        },
      }
    case REMOVE_IMAGE:
      return {
        ...state,
        albumDetail: action.payload.result,
      }
    default:
      return state
  }
}

export default albumReducer
