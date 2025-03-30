import { CURRENT_MONTH, CURRENT_YEAR, VIEW } from '../constants/constants'
import { initialModel } from '../models/initialModel'
import { formatDate } from '../utils/helper'

export const mainReducer = (state = {}, action) => {
  switch (action.type) {
    case '@@INIT': {
      return initialModel
    }

    case 'SET_CATEGORIES': {
      const cat0 = {
        id: -1,
        catName: 'ERROR',
        template: 0,
        activated: false,
        filtered: false
      }
      const categories = action.payload.categories
        .map(c => {
          return {
            ...c,
            activated: false,
            filtered: false
          }
        })
        .concat(cat0)
      return { ...state, categories }
    }

    case 'SET_OBJECTS': {
      const objects = action.payload.objects
      return { ...state, objects }
    }

    case 'SET_YEARS': {
      const years = action.payload.years
      return {
        ...state,
        years: years.map(y => {
          return { year: y, filtered: y === CURRENT_YEAR }
        })
      }
    }

    case 'SET_PRICES': {
      const prices = action.payload.prices.map(p => {
        const obj_ = state.objects.filter(o => o.id === p.objectId)
        const obj =
          obj_.length === 0
            ? { objName: '*Error*', objectId: -1, catId: -1 }
            : obj_[0]
        const cat_ = state.categories.filter(c => c.id === obj.catId)
        const cat = cat_.length === 0 ? { catName: '*Error*', id: -1 } : cat_[0]
        return {
          ...p,
          actionDate: formatDate(p.actionDate),
          objectId: obj.objectId,
          objName: obj.objName,
          catId: cat.id,
          catName: cat.catName
        }
      })
      const activatedCatIds = [...new Set(prices.map(p => p.catId))]
      const categories = state.categories.map(cat => {
        return {
          ...cat,
          activated: activatedCatIds.includes(cat.id)
        }
      })
      return {
        ...state,
        prices,
        categories
      }
    }

    case 'UPDATE_MONTH': {
      const { months, filterOptions } = state
      const { month, filtered } = action.payload
      const { isMultiMonths } = filterOptions
      const isCheckedMonthIsOnly =
        months.filter(m => m.filtered === filtered).length === 1
      const months_ = months.map(m => {
        return {
          ...m,
          filtered: isMultiMonths
            ? m.months === month
              ? isCheckedMonthIsOnly
                ? true
                : filtered
              : m.filtered
            : m.month === month
        }
      })
      return {
        ...state,
        months: months_
      }
    }

    case 'UPDATE_YEAR': {
      const { years, filterOptions } = state
      const { year, filtered } = action.payload
      const { isMultiYears } = filterOptions
      const isCheckedYearIsOnly =
        years.filter(y => y.filtered === filtered).length === 1
      const years_ = years.map(y => {
        return {
          ...y,
          filtered: isMultiYears
            ? y.year === year
              ? isCheckedYearIsOnly
                ? true
                : filtered
              : y.filtered
            : y.year === year
        }
      })
      return {
        ...state,
        years: years_
      }
    }

    case 'UPDATE_ALL_YEARS': {
      const { isAllYearsChecked } = action.payload
      const years = state.years.map(y => {
        return {
          ...y,
          filtered: y.year === CURRENT_YEAR ? true : isAllYearsChecked
        }
      })
      return {
        ...state,
        years,
        filterOptions: {
          ...state.filterOptions,
          isMultiYears: isAllYearsChecked
        }
      }
    }

    case 'UPDATE_ALL_MONTHS': {
      const months = state.months.map(m => {
        return {
          ...m,
          filtered:
            m.month === CURRENT_MONTH ? true : action.payload.isAllMonthsChecked
        }
      })
      return {
        ...state,
        months,
        filterOptions: {
          ...state.filterOptions,
          isMultiMonths: action.payload.isAllMonthsChecked
        }
      }
    }

    case 'UPDATE_FILTERED_CAT': {
      const { checked, catId } = action.payload
      const categories = state.categories.map(c => {
        const { isMultiCats } = state.filterOptions
        return {
          ...c,
          filtered: isMultiCats
            ? c.id === Number(catId)
              ? checked
              : c.filtered
            : c.id === Number(catId)
        }
      })
      return {
        ...state,
        categories
      }
    }

    case 'UPDATE_ALL_CATS': {
      const categories = state.categories.map(c => {
        return {
          ...c,
          filtered: action.payload
        }
      })
      return {
        ...state,
        categories,
        filterOptions: {
          ...state.filterOptions,
          isMultiCats: action.payload ? true : state.filterOptions.isMultiCats
        }
      }
    }

    case 'UPDATE_MULTIPLE_YEARS': {
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          isMultiYears: action.payload
        }
      }
    }

    case 'UPDATE_MULTIPLE_MONTHS': {
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          isMultiMonths: action.payload
        }
      }
    }

    case 'UPDATE_MULTIPLE_CATS': {
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          isMultiCats: action.payload
        }
      }
    }

    case 'UPDATE_SEARCH_WORD': {
      return {
        ...state,

        filterOptions: {
          ...state.filterOptions,
          searchWord: action.payload
        }
      }
    }

    case 'UPDATE_SEARCH_MIN': {
      return {
        ...state,

        filterOptions: {
          ...state.filterOptions,
          searchMin: action.payload === '' ? null : Number(action.payload)
        }
      }
    }

    case 'UPDATE_SEARCH_MAX': {
      return {
        ...state,

        filterOptions: {
          ...state.filterOptions,
          searchMax: action.payload === '' ? null : Number(action.payload)
        }
      }
    }

    case 'TO_HOME': {
      return {
        ...state,
        view: VIEW.HOME
      }
    }

    case 'TO_ADD': {
      return {
        ...state,
        view: VIEW.ADD
      }
    }

    case 'TO_BOARD': {
      return {
        ...state,
        view: VIEW.BOARD
      }
    }


    case 'ADD_PRICE_CATID': {
      return {
        ...state,
        addPriceInput : {...state.addPriceInput,
                          catId:action.payload
         }
      }
    }

    default:
      return state
  }
}
