import { mockObjs, mockCats } from '../mocks/references'
import { formatDate } from '../utils/helper'

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
          actionDate: formatDate(p.actionDate),
          objName: obj.objName,
          catName: cat.catName,
          catId: cat.id
        }
      })
      const catNames = prices.map(p => p.catName)
      const activatedCats_ = [...new Set(catNames)]
      const catsAll_ = state.catsAll.map(cat => {
        return {
          ...cat,
          activated: activatedCats_.includes(cat.catName)
        }
      })
      const objNames = prices.map(p => p.objName)
      return {
        ...state,
        catsAll: catsAll_,
        prices: prices,
        activedObjs: [...new Set(objNames)].sort((a, b) =>
          a.localeCompare(b, 'fr', { sensitivity: 'base' })
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

    case 'UPDATE_FILTERED_CAT': {
      const { checked, catId } = action.payload
      const catsAll_ = state.catsAll.map(c => {
        return {
          ...c,
          filtered: c.id === catId ? checked : c.filtered
        }
      })
      return {
        ...state,
        catsAll: catsAll_
      }
    }

    default:
      return state
  }
}
