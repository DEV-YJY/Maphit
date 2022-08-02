import React from 'react'
import useDarkMode from '../hook/useDarkMode'
import { Link } from 'react-router-dom'
import { useLogout } from '../hook/useLogout'

function Nav() {
  const [colourTheme, setTheme] = useDarkMode()
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }

  return (
    <div className='mx-auto flex justify-between'>
      <Link className='' to='/'>
        <div className='ml-5 flex justify-start '>
          <img className='w-7' src='/arrow-left.png' alt='left-arrow' />
          <p>Gallery</p>
        </div>
      </Link>
      <nav>
        <div>
          <button onClick={handleClick}>Log out</button>
        </div>
        <div>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Sign up</Link>
        </div>
      </nav>
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
