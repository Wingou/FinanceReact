export const mainReducer = (state = {}, action) => {
  // console.log('PASSE PAR REDUCER')
   console.log('type : ', action.type)
   console.log('payload : ', action.payload)

  switch (action.type) {
    case '@@INIT':
      return {
        selectedYear: 2025,
        selectedMonth: 1,
        prices: [],
        objects : [],
        categories : []
      }

    case 'SET_CATEGORIES':{
      const result = {
        ...state,
        categories : action.payload.categories
      }
      return result;
    }
    case 'SET_OBJECTS':{
      const result = {
        ...state,
        objects : action.payload.objects
      }
      return result;
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
