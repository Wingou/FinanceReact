import { store } from '../store/store'

export const handleUpdateYear = (e:React.ChangeEvent<HTMLInputElement>) => {
  const action = {
    type: 'UPDATE_YEAR',
    payload: { year: parseInt(e.target.name), isOn: e.target.checked }
  }
  store.dispatch(action)
}

export const handleUpdateMonth = (e:React.ChangeEvent<HTMLInputElement>) => {
  const action = {
    type: 'UPDATE_MONTH',
    payload: { month: parseInt(e.target.name), isOn: e.target.checked }
  }
  store.dispatch(action)
}

export const handleFilteredCat = (e:React.ChangeEvent<HTMLInputElement>) => {
  const action = {
    type: 'UPDATE_FILTERED_CAT',
    payload: {
      catId: e.target.name,
      checked: e.target.checked
    }
  }
  store.dispatch(action)
}

export const handleUpdateAllCats = (e:React.ChangeEvent<HTMLInputElement>) => {
  const action = {
    type: 'UPDATE_ALL_CATS',
    payload: e.target.checked
  }
  store.dispatch(action)
}

export const handleUpdateAllYears = (e:React.ChangeEvent<HTMLInputElement>) => {
  const action = {
    type: 'UPDATE_ALL_YEARS',
    payload: { isAllYearsChecked: e.target.checked }
  }
  store.dispatch(action)
}

export const handleUpdateAllMonths = (e:React.ChangeEvent<HTMLInputElement>) => {
  const action = {
    type: 'UPDATE_ALL_MONTHS',
    payload: { isAllMonthsChecked: e.target.checked }
  }
  store.dispatch(action)
}

export const handleUpdateMultipleYears = (e:React.ChangeEvent<HTMLInputElement>) => {
  const action = {
    type: 'UPDATE_MULTIPLE_YEARS',
    payload: e.target.checked
  }
  store.dispatch(action)
}

export const handleUpdateMultipleMonths = (e:React.ChangeEvent<HTMLInputElement>) => {
  const action = {
    type: 'UPDATE_MULTIPLE_MONTHS',
    payload: e.target.checked
  }
  store.dispatch(action)
}

export const handleUpdateMultipleCats = (e:React.ChangeEvent<HTMLInputElement>) => {
  const action = {
    type: 'UPDATE_MULTIPLE_CATS',
    payload: e.target.checked
  }
  store.dispatch(action)
}

export const handleUpdateSearchWord = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const action = {
      type : 'UPDATE_SEARCH_WORD',
      payload : e.target.value
    }
    store.dispatch(action)
}

export const handleUpdateSearchMin = (e:React.ChangeEvent<HTMLInputElement>) =>{
  const action = {
    type : 'UPDATE_SEARCH_MIN',
    payload : e.target.value
  }
  store.dispatch(action)
}

export const handleUpdateSearchMax = (e:React.ChangeEvent<HTMLInputElement>) =>{
  const action = {
    type : 'UPDATE_SEARCH_MAX',
    payload : e.target.value
  }
  store.dispatch(action)
}