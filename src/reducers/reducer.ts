import {
  catNone,
  CURRENT_DATE_TIME,
  CURRENT_MONTH,
  CURRENT_YEAR,
  objNone,
  VIEW
} from '../constants/constants'
import { initialAddPriceInput, initialModel } from '../models/initialModel'
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
      const categories = action.payload.categories
        .map((c: Categorie): Categorie => {
          return {
            ...c,
            activated: false,
            filtered: false
          }
        })
        .concat(catNone)

      return { ...state, categories }
    }

    case 'SET_OBJECTS': {
      const objects_ = action.payload.objects.concat(objNone)
      const objects = objects_.map((o: Object): Object => {
        const catName = getCatById(state.categories, o.catId).catName
        return { ...o, catName }
      })
      return {
        ...state,
        objects
      }
    }

    case 'SET_YEARS': {
      const years = action.payload.years as number[]
      return {
        ...state,
        years: years.map((y: number): Year => {
          return { year: y, name: y.toString(), filtered: y === CURRENT_YEAR }
        })
      }
    }

    case 'SET_PRICES': {
      const prices = action.payload.prices.map((p: Price): Price => {
        const obj = getObjById(state.objects, p.objId)
        const cat = getCatById(state.categories, obj.catId)
        return {
          ...p,
          actionDate: p.actionDate,
          objId: obj.id,
          objName: obj.objName,
          catId: cat.id,
          catName: cat.catName
        }
      })
      const activatedCatIds = [...new Set(prices.map((p: Price): number => p.catId))]
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
      const { months, searchOptions } = state
      const { month, filtered } = action.payload
      const { isMultiMonths } = searchOptions
      const isCheckedMonthIsOnly =
        months.filter(m => m.filtered === filtered).length === 1
      const months_ = months.map(m => {
        return {
          ...m,
          filtered: isMultiMonths
            ? m.month === month
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
      const { years, searchOptions } = state
      const { year, filtered } = action.payload
      const { isMultiYears } = searchOptions
      const isCheckedYearIsOnly = years.filter(y => y.filtered).length === 1
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
          filtered: y.name === CURRENT_YEAR.toString() ? true : isAllYearsChecked
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
          filtered:
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
        view: 'HOME' as VIEW
      }
    }

    case 'TO_ADD': {
      return {
        ...state,
        view: 'ADD' as VIEW
      }
    }

    case 'TO_BOARD': {
      return {
        ...state,
        view: 'BOARD' as VIEW
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
        addPriceInput: { ...state.addPriceInput, priceValue: action.payload }
      }
    }

    case 'ADDPRICEINPUT_SET_COMMENT': {
      return {
        ...state,
        addPriceInput: { ...state.addPriceInput, comment: action.payload }
      }
    }

    case 'SET_PRICES_AFTER_ADD': {
      const { id, objId, priceValue, actionDate, comment } = action.payload
      const obj = getObjById(state.objects, objId)

      return {
        ...state,
        prices: [
          {
            id,
            priceValue: Number(priceValue),
            actionDate: actionDate,
            comment,
            objId,
            template: 0,
            dateCreate: CURRENT_DATE_TIME,
            dateModif: CURRENT_DATE_TIME,
            objName: obj.objName,
            catId: obj.catId,
            catName: obj.catName
          },
          ...state.prices
        ],
        addPriceInput: initialAddPriceInput
      }
    }

    default:
      return state
  }
}
