import { createSlice, createAsyncThunk } from '@reduxjs/too'
import axios from 'axios'

const initialState = {
  albumDetail: {
    geolocation: [],
    images: [],
    place: {},
  },
}

// require CAT?
export const fetchAlbumDetail = createAsyncThunk(
  'albumDetail/fetchAlbumDetail',
  (albumId) => {
    return axios.get(`/albums/${albumId}`).then((res) => res.data)
  }
)

export const uploadImageWithGeoData = async (albumId, data, configParam) => {
  const res = await axios.put(`/albums/upload/${albumId}`, data, configParam)
  const resData = res.data.result.images
  const resGeo = await axios.put(`/albums/geoUpdate/${albumId}`)
  const resGeoData = resGeo.data.result.geolocation
  const resGeoPlace = resGeo.data.result.place
  return {
    resData,
    resGeoData,
    resGeoPlace,
  }
}

export const uploadImage = createAsyncThunk(
  'albumdetail/uploadImage',
  (albumId, data, configParam) => {
    return axios
      .put(`/albums/upload/${albumId}`, data, configParam)
      .then((res) => res.data)
  }
)

export const removeImage = createAsyncThunk(
  'albumDetail/removeImage',
  (albumId, imageName) => {
    return axios
      .put(`/albums/removeImage/${albumId}`, { fileName: imageName })
      .then((res) => res.data)
  }
)

const albumDetailSlice = createSlice({
  name: 'albumDetail',
  initialState,
  reducers: {
    fetchAlbumDetail: (state, action) => {
      state.albumDetail = action.payload.result
    },
    uploadImageWithGeoData: (state, action) => {
      let { resData, resGeoData, resGeoPlace } = action.payload
      state.albumDetail.images = action.payload.resData
      state.albumDetail.geolocation = action.payload.resGeoData
      state.albumDetail.place = action.payload.resGeoPlace
    },
    uploadImage: (state, action) => {
      state.albumDetail = action.payload.result
    },
    uploadGeoData: (state, action) => {
      state.albumDetail = action.payload.result
    },
  },
})

export default albumDetailSlice.reducer
