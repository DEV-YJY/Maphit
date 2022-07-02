/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, Link, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../redux/configStore'
import { createMemoryHistory } from 'history'

// import renderWithRedux from '../redux/utils/test-utils'

import Gallery from './Gallery'

import { fetchAlbums, deleteAlbum } from '../redux/actions/album'
import { initialState, albumReducer } from '../redux/reducers/albumReducer'
import { createStore } from 'redux'
jest.mock('../redux/actions/album')

const fakeStore = {
  getState: jest.fn(() => {
    {
      {

      }
    }}),
  dispatch: jest.fn(),
  subscribe: jest.fn()
}

fetchAlbums.mockImplementation(() => () => {})

// function renderWithRedux(
//   ui,
//   { initialState, store = createStore(albumReducer, initialState)} = {}
// ) {
//   return {
//     ...render(<Provider store={store}>{ui}</Provider>),
//     store
//   }
// }

describe('<Gallery />', () => {
  // Test Basic Rendering
  it('renders <Gallery /> component correctly',  () => {
    // not getting the initialstate 
    render(
      <Provider store={fakeStore}>
        <Gallery />
      </Provider>
    )
    const heading = screen.getByRole('heading')
    // screen.debug()
    expect(heading).toContain('Gallery')
  })

  // Test Link
  // it('routes to a new route on click', () => {
  //   render(
  //     <Provider store={fakeStore}>
  //       <Gallery />
  //     </Provider>
  //   )
  //   const history = createMemoryHistory({ initialEntries: ['/albums'] })
  //     expect(history.location.path).toBe('/albums')
  //     fireEvent.click(screen.getByText('Add Trip Album'))
  //     expect(history.location.path).toBe('/add')
  // })
})


// const { render } = require("@testing-library/react");
// const { createMemoryHistory } = require("history");
// const React = require("react");
// const { Router } = require("react-router-dom");

// it("works", () => {
//   const history = createMemoryHistory();
//   render(
//     <Router location={history.location} navigator={history}></Router>
//   );
// });

// it('renders', () => {
//   expect(true).toBe(true)
// }) 