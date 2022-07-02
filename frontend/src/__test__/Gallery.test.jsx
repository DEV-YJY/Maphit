/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'
import store from '../redux/configStore'

// import '@testing-library/jest-dom'

// import renderWithRedux from '../redux/utils/test-utils'

import Gallery from '../components/Gallery'

import { fetchAlbums, deleteAlbum } from '../redux/actions/album'
import { initialState, albumReducer } from '../redux/reducers/albumReducer'
import { createStore } from 'redux'

// is this the correct directory?
jest.mock('../redux/actions/album')

const mockState = {
  album: {
    albumDetail: {
      geolocation: [],
      images: ['hi.jpeg'],
      place: {
        lat: 123,
        lng: 456,
        placeName: 'Singapore',
      },
    },
    albumList: [
      {
        description: 'hi',
        place: {
          lat: 123,
          lng: 456,
          placeName: 'Singapore',
        },
        images: ['123.jpg', '456.jpg'],
      },
    ],
  },
}

const fakeStore = {
  getState: jest.fn(() => mockState),
  dispatch: jest.fn(),
  subscribe: jest.fn(),
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
  it('renders <Gallery /> component correctly', () => {
    // not getting the initialstate
    const history = createMemoryHistory({ initialEntries: ['/albums'] })

    render(
      <Provider store={fakeStore}>
        <Router location={history.location} navigator={history}>
          <Gallery />
        </Router>
      </Provider>
    )
    const heading = screen.getByRole('heading')
    // screen.debug()
    expect(heading.innerHTML).toContain('Gallery')
  })

  // Test Link
  it('routes to a AddAlbum component on click', async () => {
    expect.assertions(2)
    const history = createMemoryHistory({ initialEntries: ['/albums'] })

    render(
      <Provider store={fakeStore}>
        <Router location={history.location} navigator={history}>
          <Gallery />
        </Router>
      </Provider>
    )
    const addTripAlbum = screen.getByText('Add Trip Album')
    // console.log(addTripAlbum)
    expect(history.location.pathname).toBe('/albums')
    await fireEvent.click(addTripAlbum)
    expect(history.location.pathname).toBe('/add')
    // check that the content changed to the new page
    // not working
    // expect(screen.getByText(/description/i)).toBeInTheDocument()
  })
})

// it('renders', () => {
//   expect(true).toBe(true)
// })
