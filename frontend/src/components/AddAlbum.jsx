import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addAlbum } from '../redux/actions/album'
import PlacesAutocomplete from 'react-places-autocomplete'

import { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete'
function AddAlbum(props) {
  // console.log(props)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // Album name and desc
  const [values, setValues] = useState({})
  const [address, setAddress] = useState('')
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    // console.log(name)
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addAlbum(values)).then((res) => {
      if (res.payload.status) {
        // console.log('payload.result: ', res.payload.result)
        navigate(`/upload/${res.payload.result._id}`)
      }
    })
  }

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    // console.log('this is results: ', results)
    const latlng = await getLatLng(results[0])
    // console.log('this is latlng: ', latlng)
    setAddress(value)
    setCoordinates(latlng)
    // console.log('this is cooridnates: ', coordinates)
  }

  useEffect(() => {
    setValues({
      ...values,
      place: {
        lat: coordinates.lat,
        lng: coordinates.lng,
        // placeName
        placeName: address,
      },
    })
  }, [coordinates])

  return (
    <>
      <Link to='/'>Back to Gallery</Link>
      <p>-----------------------------</p>
      <div>
        <div>
          <label>Album Name: </label>
          <input
            type='text'
            // NAME needs to be matched with Schema name
            name='name'
            placeholder='Enter album name'
            onChange={handleInputChange}
          />
          <p>----------------------------------------------</p>
        </div>
        <div>
          <label>Description</label>
          <textarea
            name='description'
            placeholder='Enter description'
            onChange={handleInputChange}
          />
          <p>----------------------------------------------</p>
        </div>
        <div>
          <label>
            Name of the Country or the City visited: <strong>{address}</strong>
          </label>
        </div>
      </div>

      <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              style={{ width: '80%' }}
              {...getInputProps({
                placeholder: 'Enter the Country/City visited here ...',
              })}
            />
            <p>----------------------------------------------</p>
            <div>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item'
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' }
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <div>
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
