import { configureStore } from '@reduxjs/toolkit'
import { mainReducer } from './reducers/reducer'

export const store = configureStore(
  {
    reducer: mainReducer
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
