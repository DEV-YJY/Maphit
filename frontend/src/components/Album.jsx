import React from 'react'
import {Link} from 'react-router-dom'

function Album() {
  return (
    <>
      <Link to='/'>Albums</Link>
      <div>Add Album</div>
    </>
  )
}

export default Album