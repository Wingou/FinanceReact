import { store } from '../store'

export const handleUpdateYear = e => {
  const action = {
    type: 'UPDATE_YEAR',
    payload: { year: parseInt(e.target.name), filtered: e.target.checked }
  }
  store.dispatch(action)
}

export const handleUpdateMonth = e => {
  const action = {
    type: 'UPDATE_MONTH',
    payload: { month: parseInt(e.target.name), filtered: e.target.checked }
  }
  store.dispatch(action)
}

export const handleFilteredCat = e => {
  const action = {
    type: 'UPDATE_FILTERED_CAT',
    payload: {
      catId: Number(e.target.name),
      checked: e.target.checked
    }
  }
  store.dispatch(action)
}

export const handleUpdateAllCats = e => {
  const action = {
    type: 'UPDATE_ALL_CATS',
    payload: e.target.checked
  }
  store.dispatch(action)
}

export const handleUpdateAllYears = e => {
  const action = {
    type: 'UPDATE_ALL_YEARS',
    payload: { allYearsChecked: e.target.checked }
  }
  store.dispatch(action)
}

export const handleUpdateAllMonths = e => {
  const action = {
    type: 'UPDATE_ALL_MONTHS',
    payload: { allMonthsChecked: e.target.checked }
  }
  store.dispatch(action)
}

export const handleUpdateMultipleYears = e => {
  const action = {
    type: 'UPDATE_MULTIPLE_YEARS',
    payload: e.target.checked
  }
  store.dispatch(action)
}

export const handleUpdateMultipleMonths = e => {
  const action = {
    type: 'UPDATE_MULTIPLE_MONTHS',
    payload: e.target.checked
  }
  store.dispatch(action)
}

export const handleUpdateMultipleCats = e => {
  const action = {
    type: 'UPDATE_MULTIPLE_CATS',
    payload: e.target.checked
  }
  store.dispatch(action)
}
