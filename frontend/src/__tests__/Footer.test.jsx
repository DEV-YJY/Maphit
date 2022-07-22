import React from 'react'
import { render, screen } from '@testing-library/react'

import Footer from '../components/Footer'

describe('<Footer />', () => {
  it('renders <Footer /> component correctly', () => {
    render(<Footer />)
    const footer = screen.getByRole('heading')
    expect(footer.innerHTML).toContain('Copyright')
  })
})
