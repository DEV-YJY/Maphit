import React from 'react'
import { render, screen } from '@testing-library/react'

// wrappers
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createMemoryHistory } from 'history'

import PlacesAutocomplete from 'react-places-autocomplete'

import configStore from '../redux/configStore'

import AddAlbum from '../components/AddAlbum'
import { addAlbum } from '../redux/actions/album'
import { mockState } from './_utils'
jest.mock('../redux/actions/album')
jest.mock('../components/AddAlbum.jsx')

beforeEach(() => {
  jest.clearAllMocks()
})

afterAll(() => {
  jest.restoreAllMocks()
})

const fakeStore = {
  getState: jest.fn(() => mockState),
  dispatch: jest.fn(),
  subscribe: jest.fn(),
}

addAlbum.mockImplementation(() => () => {})

// page renders save button or text save
// below not working T_T

// describe('<AddAlbum />', () => {
//   it('renders save button', () => {
//     const history = createMemoryHistory({ initialEntries: ['/albums/add'] })
//     const setValue = () => {
//       return () => {}
//     }
//     render(
//       <Provider store={fakeStore}>
//         <Router location={history.location} navigator={history}>
//           <PlacesAutocomplete onChange={setValue()}>
//             <AddAlbum />
//           </PlacesAutocomplete>
//         </Router>
//       </Provider>
//     )
//     const saveButton = screen.getByRole('button')
//     console.log(saveButton)
//   })
// })

// onclick => direct to album
// onclick => fire addalbum action
