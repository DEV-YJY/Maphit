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
      <form className='px-4 my-32 max-w-3xl mx-auto space-y-6'>
        <h2 className='text-3xl font-semibold'>Album Detail</h2>
        <div className='flex space-x-4'>
          <div className='w-1/2'>
            <label>Album Name </label>
            <input
              className='border border-gray-400 block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-500'
              type='text'
              // NAME needs to be matched with Schema name
              name='name'
              placeholder='Enter album name'
              onChange={handleInputChange}
            />
          </div>

          <div className='w-1/2'>
            <label>Description</label>
            <input
              className='border border-gray-400 block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-500'
              name='description'
              placeholder='Enter description'
              onChange={handleInputChange}
            />
          </div>
        </div>

        <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <label>Name of the Country or the City visited</label>
              <input
                className='border border-gray-400 block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-500'
                {...getInputProps({
                  placeholder: 'Enter the Country/City visited here ...',
                })}
              />
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
        <div className='flex justify-center'>
          <button
            className='rounded uppercase font-bold tracking-wider bg-teal-600 px-4 py-2 text-white'
            onClick={handleSubmit}
          >
            Save
          </button>
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
      </form>
    </>
  )
}

export default AddAlbum
