import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addAlbum } from '../actions/album'

function AddAlbum(props) {
  // console.log(props)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // Album name and desc
  const [values, setValues] = useState({})

  const handleInputChange = e => {
    const {name, value} = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(addAlbum(values))
      .then(res => {
        if (res.payload.status) {
          // console.log('payload.result: ', res.payload.result)
          navigate(`/upload/${res.payload.result._id}`)
        }
      })
  }

  return (
    <>
      <Link to='/'>Albums</Link>
      <div>
        <div>
          <label>Album Name</label>
          <input 
            type='text'
            // NAME needs to be matched with Schema name
            name='name' 
            placeholder='Enter album name'
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name='description'
            placeholder='Enter description'
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleSubmit}>Save</button>
      </div>
      {/* <form>
        <label>
          Album Name:
          <input type="text" name="name" />
        </label>
        <label>
          Description:
          <input type="textarea" name="name" />
        </label>
        <button>Save</button>
        <input type="submit" value="Submit" /> 
      </form>  */}
    </>
  )
}

export default AddAlbum