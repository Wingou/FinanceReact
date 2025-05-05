import {
  catNone,
  objNone,
  CURRENT_DATE_TIME,
  CURRENT_YEAR,
  CURRENT_MONTH,
  PAGE,
  MONTHS
} from '../constants/constants'
import { initialModel, initialModifPriceInput } from '../models/initialModel'
import { ActionType, AddPriceInput, Categorie, ModifPriceInput, Month, Object, Price, StateType, Year } from '../types/common'
import { CatGql, ObjGql, PriceGql, YearGql } from '../types/graphql'
import { formatCalendarDate, getCatById } from '../utils/helper'


export const mainReducer = (state: StateType = initialModel, action: ActionType) => {
  switch (action.type) {
    case '@@INIT': {
      return {
        ...initialModel,
        months: MONTHS.map((m, index) => {
          return {
            name: m,
            month: index + 1,
            isOn: index + 1 === CURRENT_MONTH
          }
        })
      }
    }

    case 'SET_CATEGORIES': {
      const categoriesApi = action.payload.categories as CatGql[]
      const categories = categoriesApi
        .map((c: CatGql): Categorie => {
          const { id, position, template } = c
          return {
            ...c,
            id: parseInt(id),
            position,
            template,
            recette: 0,
            depense: 0,
            isDisplayed: false,
            isOn: false
          }
        })
        .concat(catNone)
      return { ...state, categories }
    }

    case 'SET_OBJECTS': {
      const objectsApi = action.payload.objects as ObjGql[]
      const objects = objectsApi.map((o: ObjGql): Object => {
        const { id, template, cat } = o
        const { id: catId } = cat
        const cat_ = getCatById(state.categories, parseInt(catId))
        return {
          ...o,
          id: parseInt(id),
          template,
          cat: cat_
        }
      }
      )
        .concat(objNone)
      return {
        ...state,
        objects
      }
    }

    case 'SET_YEARS': {
      const years = action.payload.years as YearGql[]
      return {
        ...state,
        years: years.map((y: YearGql): Year => {
          const { name: yearStr } = y
          const yNum = parseInt(yearStr)
          const year = isNaN(yNum) ? 0 : yNum
          return {
            year,
            name: yearStr,
            isOn: year === CURRENT_YEAR
          }
        })
      }
    }

    case 'SET_PRICES': {
      const prices = action.payload.pricesByDates as PriceGql[]
      const displayedCatIds = [...new Set(prices.map((p: PriceGql): number => parseInt(p.cat.id)))]
      const categories = state.categories.map(cat => {
        return {
          ...cat,
          isDisplayed: displayedCatIds.includes(cat.id)
        }
      })
      return {
        ...state,
        prices: prices.map((p: PriceGql): Price => {
          const { id, amount, comment, obj, cat } = p
          return {
            ...p,
            id: parseInt(id),
            amount: parseFloat(amount),
            comment,
            obj: {
              ...p.obj,
              id: parseInt(obj.id)
            },
            cat: {
              ...p.cat,
              id: parseInt(cat.id)
            }
          }
        }),
        categories
      }
    }

    case 'UPDATE_MONTH': {
      const { months, searchOptions } = state
      const { month, isOn } = action.payload as Month
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
      const { year, isOn } = action.payload as Year
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
      const { isAllYearsChecked } = action.payload as { isAllYearsChecked: boolean }
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
      const { isAllMonthsChecked } = action.payload as { isAllMonthsChecked: boolean }
      const months = state.months.map((m: Month): Month => {
        return {
          ...m,
          isOn:
            m.month === CURRENT_MONTH ? true : isAllMonthsChecked
        }
      })
      return {
        ...state,
        months,
        searchOptions: {
          ...state.searchOptions,
          isMultiMonths: isAllMonthsChecked
        }
      }
    }

    case 'UPDATE_FILTERED_CAT': {
      const { categories: stateCat, searchOptions } = state
      const { checked, catId } = action.payload as { checked: boolean, catId: number }
      const categories = stateCat.map((c: Categorie): Categorie => {
        const { isMultiCats } = searchOptions
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
      const { searchOptions, categories: statCat } = state
      const isMultiCats_ = action.payload as boolean
      const categories = statCat.map((c: Categorie): Categorie => {
        return {
          ...c,
          isOn: isMultiCats_
        }
      })
      return {
        ...state,
        categories,
        searchOptions: {
          ...searchOptions,
          isMultiCats: isMultiCats_ ? true : searchOptions.isMultiCats
        }
      }
    }

    case 'UPDATE_MULTIPLE_YEARS': {
      return {
        ...state,
        searchOptions: {
          ...state.searchOptions,
          isMultiYears: action.payload as boolean
        }
      }
    }

    case 'UPDATE_MULTIPLE_MONTHS': {
      return {
        ...state,
        searchOptions: {
          ...state.searchOptions,
          isMultiMonths: action.payload as boolean
        }
      }
    }

    case 'UPDATE_MULTIPLE_CATS': {
      return {
        ...state,
        searchOptions: {
          ...state.searchOptions,
          isMultiCats: action.payload as boolean
        }
      }
    }

    case 'UPDATE_SEARCH_WORD': {
      return {
        ...state,
        searchOptions: {
          ...state.searchOptions,
          searchWord: action.payload as string
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
      const newPrice = action.payload as PriceGql
      const { id, amount, comment, actionDate, obj, cat } = newPrice
      const { id: objId, name: objName } = obj
      const { id: catId, name: catName } = cat

      const categories = state.categories.map((c: Categorie): Categorie => {
        return c.id === parseInt(catId) ? { ...c, isOn: true, isDisplayed: true } : c
      })
      const isMultiCats = categories.filter((c: Categorie): boolean => c.isOn).length > 1
      return {
        ...state,
        prices: [{
          id: Number(id),
          amount: Number(amount),
          comment,
          actionDate,
          template: 0,
          dateCreate: CURRENT_DATE_TIME,
          dateModif: CURRENT_DATE_TIME,
          obj: { id: Number(objId), name: objName, template: 0 },
          cat: { id: Number(catId), name: catName, template: 0, position: 99 }
        } as Price
          ,
        ...state.prices
        ],
        addPriceInput: {
          ...state.addPriceInput,
          amount: '',
          comment: ''
        },
        searchOptions: {
          ...state.searchOptions,
          isMultiCats,
          lastMutatedPriceId: parseInt(id)
        },
        categories
      }
    }

    case 'DELPRICEINPUT': {
      const pId = action.payload.id as number;

      const prices = state.prices.map((p: Price): Price => {
        return p.id === pId ? { ...p, template: 2 } : p
      })

      return {
        ...state,
        prices
      }
    }

    case 'MODIFPRICEINPUT': {
      const p = action.payload as ModifPriceInput;
      return {
        ...state,
        modifPriceInput: {
          ...p,
          actionDate: formatCalendarDate(p.actionDate)
        }
      }
    }

    case 'MODIFPRICEINPUT_SET_DATE': {
      return {
        ...state,
        modifPriceInput: {
          ...state.modifPriceInput
          , actionDate: action.payload
        }
      }
    }

    case 'MODIFPRICEINPUT_SET_OBJID': {
      return {
        ...state,
        modifPriceInput: { ...state.modifPriceInput, objId: Number(action.payload) }
      }
    }

    case 'MODIFPRICEINPUT_SET_PRICE': {
      return {
        ...state,
        modifPriceInput: { ...state.modifPriceInput, amount: action.payload }
      }
    }

    case 'MODIFPRICEINPUT_SET_COMMENT': {
      return {
        ...state,
        modifPriceInput: { ...state.modifPriceInput, comment: action.payload }
      }
    }

    case 'SET_PRICES_AFTER_MODIF': {
      const modifPrice = action.payload as PriceGql
      const { id, amount, comment, actionDate, obj, cat, template, dateModif } = modifPrice
      const { id: objId, name: objName } = obj
      const { id: catId, name: catName, position } = cat

      const categories = state.categories.map((c: Categorie): Categorie => {
        return c.id === parseInt(catId) ? { ...c, isOn: true, isDisplayed: true } : c
      })
      const isMultiCats = categories.filter((c: Categorie): boolean => c.isOn).length > 1
      return {
        ...state,
        prices: state.prices.map((p: Price): Price => {
          return p.id === parseInt(id) ?
            {
              ...p,
              amount: Number(amount),
              comment,
              actionDate,
              dateModif,
              template,
              obj: { id: Number(objId), name: objName, template: 0 },
              cat: { id: Number(catId), name: catName, template: 0, position }
            } as Price
            : p
        }),
        modifPriceInput: initialModifPriceInput,
        searchOptions: {
          ...state.searchOptions,
          isMultiCats,
          lastMutatedPriceId: parseInt(id)
        },
        categories
      }
    }

    case 'CANCELPRICEINPUT': {
      return {
        ...state,
        modifPriceInput: initialModifPriceInput
      }
    }

    default:
      return state
  }
}


