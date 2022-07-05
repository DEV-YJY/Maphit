import React from 'react'

function DeleteDialog({ message, onDialog }) {
  return (
    <div className=''>
      <h3>{message}</h3>
      <div>
        <button onClick={() => onDialog(true)}>Yes</button>
        <button onClick={() => onDialog(false)}>No</button>
      </div>
    </div>
  )
}

export default DeleteDialog
