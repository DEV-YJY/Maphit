import React from 'react'

function DeleteDialog({ message }) {
  return (
    <div className=''>
      <h3>{message}</h3>
      <div>
        <button>Yes</button>
        <button>No</button>
      </div>
    </div>
  )
}

export default DeleteDialog
