export const mainReducer = (state = {}, action) => {
  console.log('PASSE PAR REDUCER')
  console.log('action : ', action)

  switch (action.type) {
    case '@@INIT':
      return {
        selectedYear: 2025,
        selectedMonth: 1,
        prices: []
      }

    case 'SET_DATA': {
      const result = {
        ...state,
        prices: action.payload.prices
      }
      return result
    }

    case 'UPDATE_MONTH': {
      const result = {
        ...state,
        selectedMonth: action.payload
      }
      return result
    }

    case 'UPDATE_YEAR': {
      const result = {
        ...state,
        selectedYear: action.payload
      }
      return result
    }

    default:
      return state
  }
}
