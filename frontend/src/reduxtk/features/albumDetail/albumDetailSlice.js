import { createSlice } from '@reduxjs/too'

const initialState = {
  albumDetail: {
    geolocation: [],
    images: [],
    place: {},
  },
}

const albumDetailSlice = createSlice({
  name: 'albumDetail',
  initialState,
  reducers: {
    fetchAlbumDetail: (state, action) => {
      state.albumDetail = action.payload.result
    },
  },
})
