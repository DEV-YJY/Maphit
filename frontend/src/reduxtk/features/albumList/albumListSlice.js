import { createSlice, createAsyncThunk } from '@reduxjs/too'
import axios from 'axios'

const initialState = {
  albumList: [],
}

export const fetchAlbums = createAsyncThunk('albumList/fetchAlbums', () => {
  return axios.get('/albums').then((res) => res.data)
})

const albumListSlice = createSlice({
  name: 'albumList',
  initialState,
  reducers: {
    fetchAlbums: (state, action) => {
      state.albumList = [...action.payload.result]
    },
  },
})

export default albumListSlice.reducer
export const { fetchAlbum } = albumListSlice.reducer
