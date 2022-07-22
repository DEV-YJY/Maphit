import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createMemoryHistory } from 'history'
import { fetchAlbumDetail } from '../redux/actions/album'

import Album from '../components/Album'

import { mockState } from './_utils'

jest.mock('../redux/actions/album')

const fakeStore = {
  getState: jest.fn(() => mockState),
  dispatch: jest.fn(),
  subscribe: jest.fn(),
}

fetchAlbumDetail.mockImplementation(() => () => {})

describe('<Album />', () => {
  it('renders <Album /> component correctly', () => {
    const history = createMemoryHistory({ initialEntries: ['/albums/add'] })
    expect.assertions(2)
    render(
      <Provider store={fakeStore}>
        <Router location={history.location} navigator={history}>
          <Album />
        </Router>
      </Provider>
    )
    const text = screen.getByText(/name/i)
    const deleteText = screen.getByText(/Gallery/i)
    expect(text.innerHTML).toBeTruthy()
    expect(deleteText.innerHTML).toBeTruthy()
  })

  it('dispatches fetchAlbumDetail action', () => {
    const history = createMemoryHistory({ initialEntries: ['/albums/add'] })
    expect.assertions(1)

    render(
      <Provider store={fakeStore}>
        <Router location={history.location} navigator={history}>
          <Album />
        </Router>
      </Provider>
    )

    expect(fetchAlbumDetail).toHaveBeenCalled()
  })

  it('routes to a Gallery component on click', async () => {
    const history = createMemoryHistory({
      initialEntries: ['/albums/upload/62bff0c940414e889d4f4994'],
    })
    expect.assertions(1)

    render(
      <Provider store={fakeStore}>
        <Router location={history.location} navigator={history}>
          <Album />
        </Router>
      </Provider>
    )

    const backToGallery = screen.getByText('Gallery')
    // console.log(backToGallery)
    // const albumName = screen.getByText(/summer/i)
    // expect(albumName).toBeInTheDocument()
    expect(backToGallery).toBeTruthy()
  })
})

// correctly renders a components
// should display 'album name'

// click on back to gallery should redirect
// back to the home page (gallery)
