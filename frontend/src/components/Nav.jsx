import React from 'react'
import useDarkMode from '../hook/useDarkMode'
import { Link } from 'react-router-dom'

function Nav() {
  const [colourTheme, setTheme] = useDarkMode()
  return (
    <div className='mx-auto flex justify-between'>
      <Link className='ml-5' to='/'>
        To Gallery
      </Link>
      <div className='mr-2'>
        {colourTheme === 'light' ? (
          <button className='' onClick={() => setTheme(colourTheme)}>
            <div className='w-6 h-6 md:w-7 md:h-7 relative rounded-full transition duration-500 transform bg-yellow-400 -translate-x-2 p-1 '>
              <img src='/sun.png' alt='sun' />
            </div>
          </button>
        ) : (
          <button className='' onClick={() => setTheme(colourTheme)}>
            <div className='w-6 h-6 md:w-7 md:h-7 relative rounded-full transition duration-500 transform bg-gray-400 -translate-x-2 p-1 '>
              <img src='/moon.png' alt='moon' />
            </div>
          </button>
        )}
      </div>
    </div>
  )
}

export default Nav
