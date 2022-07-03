import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createMemoryHistory } from 'history'

import Album from '../components/Album'

import { mockState } from './_utils'

const fakeStore = {
  getState: jest.fn(() => mockState),
  dispatch: jest.fn(),
  subscribe: jest.fn(),
}

describe('<Album />', () => {
  it('renders <Album /> component correctly', () => {
    const history = createMemoryHistory({ initialEntries: ['/albums/add'] })

    render(
      <Provider store={fakeStore}>
        <Router location={history.location} navigator={history}>
          <Album />
        </Router>
      </Provider>
    )
    const text = screen.getByText(/album name/i)
    const deleteText = screen.getByText(/delete album/i)
    expect(text.innerHTML).toBeTruthy()
    expect(deleteText.innerHTML).toBeTruthy()
  })
})

// correctly renders a components
// should display 'album name'

// click on back to gallery should redirect
// back to the home page (gallery)
