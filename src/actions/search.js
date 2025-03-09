import { store } from '../store'

export const handleUpdateYear = e => {
  const action = {
    type: 'UPDATE_YEAR',
    payload: e.target.value
  }
  store.dispatch(action)
}

export const handleUpdateMonth = e => {
  const action = {
    type: 'UPDATE_MONTH',
    payload: e.target.value
  }
  store.dispatch(action)
}