import React from 'react'
import { screen, render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import Nav from '../components/Nav'

describe('<Nav />', () => {
  it('renders <Nav /> component correctly', () => {
    const history = createMemoryHistory({ initialEntries: ['/albums'] })
    expect.assertions(1)
    render(
      <Router location={history.location} navigator={history}>
        <Nav />
      </Router>
    )
    const nav = screen.getAllByRole('img')
    console.log(nav[0])
    expect(nav[0].alt).toContain('left-arrow')
  })
})
