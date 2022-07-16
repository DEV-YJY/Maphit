import React from 'react'
import useDarkMode from '../hook/useDarkMode'

function Nav() {
  const [colourTheme, setTheme] = useDarkMode()
  return (
    <div className='fixed top-0 right-0 bg-blue-400'>
      <span>
        {colourTheme === 'light' ? (
          <p onClick={() => setTheme(colourTheme)}>Light</p>
        ) : (
          <p onClick={() => setTheme(colourTheme)}>Dark</p>
        )}
      </span>
    </div>
  )
}

export default Nav
