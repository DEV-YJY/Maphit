import React from 'react'
import useDarkMode from '../hook/useDarkMode'

function Nav() {
  const [colourTheme, setTheme] = useDarkMode()
  return (
    <div className='fixed top-2 right-1 '>
      <span>
        {colourTheme === 'light' ? (
          <img onClick={() => setTheme(colourTheme)} src='/sun.png' alt='sun' />
        ) : (
          <img onClick={() => setTheme(colourTheme)} src='/moon.png' alt='moon' />
        )}
      </span>
    </div>
  )
}

export default Nav
