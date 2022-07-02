import { render } from '@testing-library/react'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import albumReducer from '../reducers/albumReducer'

const startingState = {
  albumList: [],
  albumDetail: {
    geolocation: [],
    images: [],
    place: {},
  },
}

// function reducer(state = startingState, action) {
//   switch (action.type) {

//   }
// }

export default function renderWithRedux(
  component,
  { initialState, store = createStore(albumReducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  }
}
