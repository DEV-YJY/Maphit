import React from 'react'
import useDarkMode from '../hook/useDarkMode'

function Nav() {
  const [colourTheme, setTheme] = useDarkMode()
  return (
    // <div className='fixed top-2 right-5 '>
    //   <span>
    //     {colourTheme === 'light' ? (
    //       <img onClick={() => setTheme(colourTheme)} src='/sun.png' alt='sun' />
    //     ) : (
    //       <img onClick={() => setTheme(colourTheme)} src='/moon.png' alt='moon' />
    //     )}
    //   </span>
    // </div>
    <div className='fixed top-5 right-5 '>
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
  )
}

export default Nav
