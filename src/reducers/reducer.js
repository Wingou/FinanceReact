import { mockObjs, mockCats } from '../mocks/references'
import { formatDate } from '../utils/helper'

export const mainReducer = (state = {}, action) => {
  switch (action.type) {
    case '@@INIT':
      return {
        selectedYear: 2025,
        selectedMonth: 1,
        prices: [],
        objects : mockObjs,
        categories: mockCats
      }

    case 'SET_PRICES': {
      const prices = action.payload.prices.map(p => {
        const obj = state.objects.find(o => o.id === p.objectId)
        const cat = state.categories.find(c => obj.catId === c.id)
        return {
          ...p,
          actionDate: formatDate(p.actionDate),
          objName: obj.objName,
          catName: cat.catName,
          catId: cat.id
        }
      })
      const catNames = prices.map(p => p.catName)
      const activatedCats = [...new Set(catNames)]
      const categories = state.categories.map(cat => {
        return {
          ...cat,
          activated: activatedCats.includes(cat.catName)
        }
      })
      return {
        ...state,
        categories,
        prices
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
      const categories = state.categories.map(c => {
        return {
          ...c,
          filtered: c.id === catId ? checked : c.filtered
        }
      })
      return {
        ...state,
        categories
      }
    }

    default:
      return state
  }
}
