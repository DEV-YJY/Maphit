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
const initialState = {
  albumList: [],
  albumDetail: {
    geolocation: [],
    images: [],
    place: {},
  },
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
      }
    case UPLOAD_IMAGE:
      return {
        ...state,
        albumDetail: action.payload.result,
      }
    case UPLOAD_IMAGE_WITH_GEO:
      return {
        ...state,
        albumDetail: {
          images: action.payload.res,
          geolocation: action.payload.resGeoData,
          place: action.payload.resGeoPlace,
        },
      }
    case REMOVE_IMAGE:
      return {
        ...state,
        albumDetail: action.payload.result,
      }
    // something is not right here
    // case UPLOAD_GEODATA:
    //   return {
    //     ...state,
    //     albumDetail: {
    //       ...state.albumDetail,
    //       geolocation: action.payload,
    //     },
    // imageGeoData: action.payload.result,
    // }
    default:
      // console.log('albumReducer: ', state)
      return state
  }
}

export default albumReducer
