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

export const handleFilteredCat = e => {
  // console.log('e name:', e.target.name)
  // console.log('e checked :', e.target.checked)
  const action = {
    type: 'UPDATE_FILTERED_CAT',
    payload: {
      catId: Number(e.target.name),
      checked: e.target.checked
    }
  }
  store.dispatch(action)
}
