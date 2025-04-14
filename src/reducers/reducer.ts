
import {
  catNone,
  CURRENT_DATE_TIME,
  CURRENT_MONTH,
  CURRENT_YEAR,
  objNone,
  PAGE
} from '../constants/constants'
import { initialModel } from '../models/initialModel'
import { Categorie, Object, Price, StateType, Year } from '../types/common'
import { getCatById, getObjById } from '../utils/helper'

interface ActionType {
  type: string,
  payload: any
}

export const mainReducer = (state: StateType = initialModel, action: ActionType) => {
  switch (action.type) {
    case '@@INIT': {
      return initialModel
    }

    case 'SET_CATEGORIES': {
      const categories = action.payload
        .map((c: Categorie): Categorie => {
          return {
            ...c,
            isDisplayed: true,
            isOn: false
          }
        })
        .concat(catNone)

      return { ...state, categories }
    }

    case 'SET_OBJECTS': {
      const objects_ = action.payload.concat(objNone)
      const objects = objects_.map((o: Object): Object => {
        const cat = getCatById(state.categories, o.cat.id)
        return { ...o, cat }
      }
      )
      return {
        ...state,
        objects
      }
    }

    case 'SET_YEARS': {
      const years = action.payload
      return {
        ...state,
        years: years.map((y: number): Year => {
          return { year: y, name: y.toString(), isOn: y === CURRENT_YEAR }
        })
      }
    }

    case 'SET_PRICES': {
      const prices = action.payload
      const displayedCatIds = [...new Set(prices.map((p: Price): number => p.cat.id))]
      const categories = state.categories.map(cat => {
        return {
          ...cat,
          isDisplayed: displayedCatIds.includes(cat.id)
        }
      })
      return {
        ...state,
        prices,
        categories
      }
    }

    case 'UPDATE_MONTH': {
      const { months, searchOptions } = state
      const { month, isOn } = action.payload
      const { isMultiMonths } = searchOptions
      const isCheckedMonthIsOnly =
        months.filter(m => m.isOn === isOn).length === 1
      const months_ = months.map(m => {
        return {
          ...m,
          isOn: isMultiMonths
            ? m.month === month
              ? isCheckedMonthIsOnly
                ? true
                : isOn
              : m.isOn
            : m.month === month
        }
      })
      return {
        ...state,
        months: months_
      }
    }

    case 'UPDATE_YEAR': {
      const { years, searchOptions } = state
      const { year, isOn } = action.payload
      const { isMultiYears } = searchOptions
      const isCheckedYearIsOnly = years.filter(y => y.isOn).length === 1
      const years_ = years.map(y => {
        return {
          ...y,
          isOn: isMultiYears
            ? y.year === year
              ? isCheckedYearIsOnly
                ? true
                : isOn
              : y.isOn
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
          isOn: y.name === CURRENT_YEAR.toString() ? true : isAllYearsChecked
        }
      })
      return {
        ...state,
        years,
        searchOptions: {
          ...state.searchOptions,
          isMultiYears: isAllYearsChecked
        }
      }
    }

    case 'UPDATE_ALL_MONTHS': {
      const months = state.months.map(m => {
        return {
          ...m,
          isOn:
            m.month === CURRENT_MONTH ? true : action.payload.isAllMonthsChecked
        }
      })
      return {
        ...state,
        months,
        searchOptions: {
          ...state.searchOptions,
          isMultiMonths: action.payload.isAllMonthsChecked
        }
      }
    }

    case 'UPDATE_FILTERED_CAT': {
      const { checked, catId } = action.payload
      const categories = state.categories.map(c => {
        const { isMultiCats } = state.searchOptions
        return {
          ...c,
          isOn: isMultiCats
            ? c.id === Number(catId)
              ? checked
              : c.isOn
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
          isOn: action.payload
        }
      })
      return {
        ...state,
        categories,
        searchOptions: {
          ...state.searchOptions,
          isMultiCats: action.payload ? true : state.searchOptions.isMultiCats
        }
      }
    }

    case 'UPDATE_MULTIPLE_YEARS': {
      return {
        ...state,
        searchOptions: {
          ...state.searchOptions,
          isMultiYears: action.payload
        }
      }
    }

    case 'UPDATE_MULTIPLE_MONTHS': {
      return {
        ...state,
        searchOptions: {
          ...state.searchOptions,
          isMultiMonths: action.payload
        }
      }
    }

    case 'UPDATE_MULTIPLE_CATS': {
      return {
        ...state,
        searchOptions: {
          ...state.searchOptions,
          isMultiCats: action.payload
        }
      }
    }

    case 'UPDATE_SEARCH_WORD': {
      return {
        ...state,
        searchOptions: {
          ...state.searchOptions,
          searchWord: action.payload
        }
      }
    }

    case 'UPDATE_SEARCH_MIN': {
      return {
        ...state,
        searchOptions: {
          ...state.searchOptions,
          searchMin: action.payload === '' ? null : Number(action.payload)
        }
      }
    }

    case 'UPDATE_SEARCH_MAX': {
      return {
        ...state,
        searchOptions: {
          ...state.searchOptions,
          searchMax: action.payload === '' ? null : Number(action.payload)
        }
      }
    }

    case 'TO_HOME': {
      return {
        ...state,
        view: { ...state.view, page: 'HOME' as PAGE }
      }
    }

    case 'TOGGLE_ADD': {
      return {
        ...state,
        view: {
          ...state.view,
          isAddOpen: !state.view.isAddOpen
        }
      }
    }

    case 'TO_BOARD': {
      return {
        ...state,
        view: { ...state.view, page: 'BOARD' as PAGE }
      }
    }

    case 'ADDPRICEINPUT_SET_CATID': {
      const catId = Number(action.payload)
      return {
        ...state,
        addPriceInput: {
          ...state.addPriceInput,
          catId,
          objId: -1
        }
      }
    }

    case 'ADDPRICEINPUT_SET_OBJID': {
      return {
        ...state,
        addPriceInput: { ...state.addPriceInput, objId: Number(action.payload) }
      }
    }

    case 'ADDPRICEINPUT_SET_DATE': {
      return {
        ...state,
        addPriceInput: { ...state.addPriceInput, actionDate: action.payload }
      }
    }
    case 'ADDPRICEINPUT_SET_PRICE': {
      return {
        ...state,
        addPriceInput: { ...state.addPriceInput, amount: action.payload }
      }
    }

    case 'ADDPRICEINPUT_SET_COMMENT': {
      return {
        ...state,
        addPriceInput: { ...state.addPriceInput, comment: action.payload }
      }
    }

    case 'SET_PRICES_AFTER_ADD': {
      const { id, objId, amount, actionDate, comment } = action.payload
      const obj = getObjById(state.objects, objId)
      return {
        ...state,
        prices: [
          {
            id,
            amount: Number(amount),
            actionDate: actionDate,
            comment,
            template: 0,
            dateCreate: CURRENT_DATE_TIME,
            dateModif: CURRENT_DATE_TIME,
            obj: { id: objId, name: obj.name },
            cat: { id: obj.cat.id, name: obj.cat.name }
          },
          ...state.prices
        ],
        addPriceInput: {
          ...state.addPriceInput,
          amount: '',
          comment: ''
        }
      }
    }

    default:
      return state
  }
}
