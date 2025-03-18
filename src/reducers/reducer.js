import { mockObjs, mockCats } from '../mocks/references'

export const mainReducer = (state = {}, action) => {
  switch (action.type) {
    case '@@INIT':
      return {
        selectedYear: 2025,
        selectedMonth: 1,
        prices: [],
        objsAll: mockObjs,
        catsAll: mockCats
      }

    case 'SET_DATA': {
      const prices = action.payload.prices.map(p => {
        const obj = state.objsAll.find(o => o.id === p.objectId)
        const cat = state.catsAll.find(c => obj.catId === c.id)
        return {
          ...p,
          objName: obj.objName,
          catName: cat.catName,
          catId: cat.id
        }
      })
      const catNames = prices.map(p => p.catName)
      const objNames = prices.map(p => p.objName)
      return {
        ...state,
        prices: prices,
        catsOn: [...new Set(catNames)].sort((a, b) =>
          a.toLowerCase().localeCompare(b.toLowerCase())
        ),
        objsOn: [...new Set(objNames)].sort((a, b) =>
          a.toLowerCase().localeCompare(b.toLowerCase())
        )
      }
    }

    case 'UPDATE_MONTH': {
      return {
        ...state,
        selectedMonth: action.payload
      }
    }

    case 'UPDATE_YEAR': {
      return {
        ...state,
        selectedYear: action.payload
      }
    }

    default:
      return state
  }
}
