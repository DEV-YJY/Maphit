import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addAlbum } from '../redux/actions/album'
import PlacesAutocomplete from 'react-places-autocomplete'

import { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete'
import Nav from './Nav'
function AddAlbum(props) {
  // console.log(props)
  const [formErrors, setFormErros] = useState({})
  const [isSubmit, setisSubmit] = useState(false)

  const validate = (values) => {
    const errors = {}
    if (!values.name) {
      errors.name = 'Album name is required'
    }
    if (!values.description) {
      errors.description = 'Description is required'
    }
    if (!values.placeVisited) {
      errors.placeVisited = 'Place visited is required'
    }
    return errors
  }

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
    setFormErros(validate(values))
    setisSubmit(true)
    dispatch(addAlbum(values)).then((res) => {
      if (res.payload.status) {
        // console.log('payload.result: ', res.payload.result)
        navigate(`/upload/${res.payload.result._id}`)
      }
    })
  }

  useEffect(() => {
    console.log(formErrors)
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(values)
    }
  }, [formErrors])

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    const latlng = await getLatLng(results[0])
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
        placeName: address.split(',').slice(-2).join(','),
      },
    })
  }, [coordinates])

  return (
    <div className='pt-3 mx-10 h-screen mb-36'>
      <Nav />

      <div class='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div class='bg-white py-8 px-6 shadow rounded-lg sm:px-10 mt-8'>
          <form className='mb-0 space-y-6'>
            <h2 className='text-3xl font-semibold text-black'>Album Detail</h2>

            <div className=''>
              <label className='text-gray-700 font-medium'>Name</label>
              <input
                className='text-black border border-gray-400 block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-500'
                type='text'
                // NAME needs to be matched with Schema name
                name='name'
                placeholder='Enter album name'
                onChange={handleInputChange}
              />
              <p className='text-red-600 text-xs'>{formErrors.name}</p>
            </div>

            <div className=''>
              <label className='text-gray-700 font-medium'>Description</label>
              <div className='mt-1'>
                <input
                  className='text-black border border-gray-400 block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-500'
                  name='description'
                  placeholder='Enter description'
                  onChange={handleInputChange}
                />
              </div>
              <p className='text-red-600 text-xs'>{formErrors.description}</p>
            </div>

            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <label className='text-gray-700 font-medium'>
                    Name of the Country or the City visited
                  </label>
                  <input
                    className='text-black border border-gray-400 block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-500'
                    name='placeVisited'
                    {...getInputProps({
                      placeholder: 'Enter the Country/City name',
                    })}
                  />
                  <p className='text-red-600 text-xs'>{formErrors.placeVisited}</p>
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
                          <span className='text-black'>{suggestion.description}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <div className='flex justify-center pb-42'>
              <button
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddAlbum
