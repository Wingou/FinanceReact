import { configureStore } from '@reduxjs/toolkit'
import { mainReducer } from '../reducers/reducer'



// ✅ configuration propre avec DevTools intégrés par défaut
export const store = configureStore({
  reducer: mainReducer,
})

// ✅ Types exportés pour les hooks
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


