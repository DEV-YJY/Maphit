import React from 'react'
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage, removeImage, fetchAlbumDetail, fetchGeoData } from '../actions/album'

function UploadGeo() {
  let params = useParams()
  const albumId = params.albumId
  const dispatch = useDispatch()

  const imageGeoData = useSelector(state => {
    console.log(state)
    return state.album.imageGeoData})

  // console.log('from uploadGeoComp: ', imageGeoData)

  function handleFetchGeoData() {
    dispatch(fetchGeoData(albumId))
  }


  return (
    <div>
      <button onClick={() => handleFetchGeoData()}>I am a button</button>
    </div>
  )
}

export default UploadGeo