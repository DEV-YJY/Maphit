import { createStore, compose, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import reduxThunk from 'redux-thunk'
import rootReducer from './reducers/index'

const composeEhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
    : compose

const configStore = () => {
  const store = createStore(
    rootReducer,
    {},
    composeEhancers(applyMiddleware(promiseMiddleware, reduxThunk))
  )
  return store
}

// const store = configureStore({
//   reducer: {
//     albumList: albumListReducer,
//     albumDetail: albumDetailReducer
//   }
// })

export default configStore
