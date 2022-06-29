import { combineReducers } from 'redux'
import albumReducer from './albumReducer'

// Obj that contains the reducer file
const rootReducer = combineReducers({
  album: albumReducer,
})

export default rootReducer
