import { configureStore } from '@reduxjs/toolkit'
import { mainReducer } from '../reducers/reducer'

// export const store = configureStore(
//   {
//     reducer: mainReducer
//   },
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )


// ✅ configuration propre avec DevTools intégrés par défaut
export const store = configureStore({
  reducer: mainReducer,
  // devTools: true ← optionnelle, activée par défaut en dev
})

// ✅ Types exportés pour les hooks
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch