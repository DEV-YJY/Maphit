import React from 'react'
import {Link} from 'react-router-dom'

function Album() {
  return (
    <>
      <Link to='/'>Albums</Link>
      <div>
        <label>Album Name</label>
        <input type='text' name='albumName' placeholder='Enter album name'/>
      </div>
      <div>
        <label>Description</label>
        <textarea
          name='description'
          placeholder='Enter description'
        ></textarea>
      </div>
      <button>Save</button>

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

export default Album