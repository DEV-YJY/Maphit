import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  albumList: [],
}

// does it need to use CAT?
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
