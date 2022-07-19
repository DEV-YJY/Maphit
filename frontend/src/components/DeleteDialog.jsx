import React from 'react'

function DeleteDialog({ message, onDialog }) {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-white bg-opacity-60'>
      <div className='flex z-50 flex-col items-center justify-center absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'>
        <h3 className='text-xl text-center'>{message}</h3>
        <div className='flex mt-4 justify-center items-center opacity-100'>
          <img
            className='mr-5 cursor-pointer'
            onClick={() => onDialog(true)}
            src='/yes-badge.png'
            alt='yes-badge'
          />
          <img
            className='ml-5 cursor-pointer'
            onClick={() => onDialog(false)}
            src='/no-badge.png'
            alt='no-badge'
          />
        </div>
      </div>
    </div>
  )
}

export default DeleteDialog
