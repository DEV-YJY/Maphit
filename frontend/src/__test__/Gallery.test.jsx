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

import { mockState } from './_utils'

// is this the correct directory?
jest.mock('../redux/actions/album')

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

  // Dispatch action on mount
  it('dispatches fetchAlbum action', () => {
    const history = createMemoryHistory({ initialEntries: ['/albums'] })

    render(
      <Provider store={fakeStore}>
        <Router location={history.location} navigator={history}>
          <Gallery />
        </Router>
      </Provider>
    )

    expect(fetchAlbums).toHaveBeenCalled()
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
    // expect(screen.getByText(/name of the country/i)).toBeInTheDocument()
  })
})

// it('renders', () => {
//   expect(true).toBe(true)
// })
/////////////////////////
// test('page header includes fruit', () => {
//   render(<Provider store={store}><App /></Provider>)
//   const heading = screen.getByRole('heading')
//   expect(heading.innerHTML).toMatch(/Fruit/)
// })
/////////////////////////////
// test('renders an <li> for each fruit', () => {
//   const fruits = ['orange', 'persimmons', 'kiwi fruit']
//   jest.spyOn(store, 'getState')
//   store.getState.mockImplementation(() => ({ fruits }))

//   render(<Provider store={store}><App /></Provider>)
//   const li = screen.getAllByRole('listitem')
//   expect(li).toHaveLength(3)
// })
///////////////////////////
// test('dispatches fetchFruits action', () => {
//   render(<Provider store={store}><App /></Provider>)
//   expect(fetchFruits).toHaveBeenCalled()
// })

///////////////////////////////
// describe('<AddWombat />', () => {
//   it('dispatches correct action when form submitted', () => {
//     const fakeDispatch = jest.fn()
//     useDispatch.mockReturnValue(fakeDispatch)
//     render(<AddWombat />)
//     const input = screen.getByRole('textbox')
//     fireEvent.change(input, {target: {value: 'bananas'}})

//     const button = screen.getByRole('button')
//     fireEvent.click(button)

//     expect(fakeDispatch).toHaveBeenCalledWith({
//       type: 'ADD_WOMBAT',
//       payload: 'bananas'
//     })
