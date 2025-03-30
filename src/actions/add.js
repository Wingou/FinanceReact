import { store } from '../store'

export const handleCatIdInput = e => {
  const catId = e.target.value
  const action = {
    type: 'ADD_PRICE_CATID',
    payload: catId
  }
  store.dispatch(action)
}
