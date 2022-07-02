import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbums, deleteAlbum } from '../redux/actions/album'
import { Link } from 'react-router-dom'
import {BrowserRouter as Router } from 'react-router-dom'

function Gallery() {
  const dispatch = useDispatch()
  // console.log('fetchAlbum in gallery: ', fetchAlbums())

  useEffect(() => {
    dispatch(fetchAlbums())
    // console.log('useEffect called')
  }, [])

  const albumList = useSelector(state => {
    // console.log('state: ', state)
    console.log(state.album)
    return state.album.albumList
  })
  console.log('albumList:', albumList)

  return (
    <>
        <h3>Gallery</h3>
        <div>---------------------------------------</div>
        <div>
          <Link to='/add'>Add Trip Album</Link>
        </div>
        <div>---------------------------------------</div>
        <div>
          {albumList !== [] && albumList.map(album => {
            return (
              <div key={album._id}>
                <div>Place of Visit: {album.place.placeName}</div>
                <div>Album name: {album.name}</div>
                <div><Link to={`/upload/${album._id}`}>View Album</Link> ({album.images.length}) photos</div>
                <div>---------------------------------------</div>
              </div>
            )
          })}
        </div>
    </>
  )
}

export default Gallery

// test('page header includes fruit', () => {
//   render(<Provider store={store}><App /></Provider>)
//   const heading = screen.getByRole('heading')
//   expect(heading.innerHTML).toMatch(/Fruit/)
// })

// test('renders an <li> for each fruit', () => {
//   const fruits = ['orange', 'persimmons', 'kiwi fruit']
//   jest.spyOn(store, 'getState')
//   store.getState.mockImplementation(() => ({ fruits }))

//   render(<Provider store={store}><App /></Provider>)
//   const li = screen.getAllByRole('listitem')
//   expect(li).toHaveLength(3)
// })

// test('dispatches fetchFruits action', () => {
//   render(<Provider store={store}><App /></Provider>)
//   expect(fetchFruits).toHaveBeenCalled()
// })

///////////////////////////////
// describe('<AddWombat />', () => {
//   it('dispatches correct action when form submitted', () => {
//     const fakeDispatch = jest.fn()
//     useDispatch.mockReturnValue(fakeDispatch)
//     render(<AddWombat />)
//     const input = screen.getByRole('textbox')
//     fireEvent.change(input, {target: {value: 'bananas'}})

//     const button = screen.getByRole('button')
//     fireEvent.click(button)

//     expect(fakeDispatch).toHaveBeenCalledWith({
//       type: 'ADD_WOMBAT',
//       payload: 'bananas'
//     })