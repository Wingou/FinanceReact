import {
  catNone,
  objNone,
  CURRENT_DATE_TIME,
  CURRENT_YEAR,
  CURRENT_MONTH,
  PAGE,
  MONTHS,
  CALLER
} from '../types/constants'
import { initialAddPriceInput, initialModel, initialModifPriceInput, initialOrderOptions } from '../models/initialModel'
import { ActionType, Categorie, ModifPriceInput, Month, MostUsedObj, Object, OrderSelectValue, Price, StateType, Year } from '../types/common'
import { CatGql, MostUsedObjectGql, ObjGql, PriceGql, YearGql } from '../types/graphql'
import { formatCalendarDate, getCatById, getObjById } from '../utils/helper'

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
            reserve: 0,
            isDisplayed: false,
            isOn: true
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
      const prices = action.payload as PriceGql[]
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
          const comment_ = comment ?? ''
          return {
            ...p,
            id: parseInt(id),
            amount: parseFloat(amount),
            comment: comment_,
            isGroupby: false,
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
      const { searchOptions, categories: cat } = state
      const isMultiCats_ = action.payload as boolean
      const categories = cat.map((c: Categorie): Categorie => {
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

    case 'UPDATE_SEARCH_DEL': {
      return {
        ...state,
        searchOptions: {
          ...state.searchOptions,
          isSearchDeleted: action.payload as boolean
        }
      }
    }


    case 'UPDATE_SEARCH_RESERVED': {
      return {
        ...state,
        searchOptions: {
          ...state.searchOptions,
          isSearchReserved: action.payload as boolean
        }
      }
    }


    case 'TO_HOME': {
      return {
        ...state,
        view: {
          ...state.view,
          isAddOpen: false,
          isLast: false,
          page: 'HOME' as PAGE
        }
      }
    }

    case 'TOGGLE_ADD': {
      return {
        ...state,
        view: {
          ...state.view,
          isAddOpen: !state.view.isAddOpen,
          page: 'BOARD' as PAGE
        }
      }
    }
    case 'TOGGLE_LAST': {
      return {
        ...state,
        view: {
          ...state.view,
          isLast: !state.view.isLast,
          page: 'BOARD' as PAGE

        }
      }
    }

    case 'TO_BOARD': {
      return {
        ...state,
        view: { ...state.view, page: 'BOARD' as PAGE }
      }
    }

    case 'SET_CATID': {
      const catId = Number(action.payload.catId)
      const caller = action.payload.caller
      const { addPriceInput, objectInput } = state
      return {
        ...state,
        addPriceInput: caller === 'ADD' ? {
          ...state.addPriceInput,
          catId,
          objId: -1
        } : addPriceInput,
        objectInput: caller === 'HOME' ? {
          ...objectInput,
          catId
        }
          : objectInput
      }
    }

    case 'SET_OBJID': {
      const objId = Number(action.payload.objId)
      const catId = state.objectInput.catId !== -1
        ? state.objectInput.catId
        : state.objects.find(o => o.id === objId)
          ? state.objects.find(o => o.id === objId)?.cat.id
          : -1
      const caller = action.payload.caller
      const { addPriceInput, objectInput, modifPriceInput } = state

      return {
        ...state,
        addPriceInput: caller === 'ADD' ? {
          ...addPriceInput,
          objId
        } : addPriceInput,
        objectInput: caller === 'HOME' ? {
          ...objectInput,
          objId,
          objName: getObjById(state.objects, objId).name,
          catId
        } : objectInput,
        modifPriceInput: caller === 'MODIF_PRICE' ? {
          ...modifPriceInput,
          objId
        } : modifPriceInput,


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
        , view: {
          ...state.view,
          isColAmount: true
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

    case 'CANCEL_INPUT': {
      const caller = action.payload as CALLER
      return {
        ...state,
        modifPriceInput: caller === 'MODIF_PRICE' ? initialModifPriceInput : state.modifPriceInput,
        addPriceInput: caller === 'ADD' ? initialAddPriceInput : state.addPriceInput,
        searchOptions: caller === 'SEARCH' ? {
          ...state.searchOptions,
          searchWord: '',
          searchMin: null,
          searchMax: null,
        } : state.searchOptions,
        orderOptions: caller === 'ORDER' ? initialOrderOptions : state.orderOptions
      }
    }

    case 'UPDATE_ORDER_INPUT': {
      const { value, index: selectedPosCurrent } = action.payload as { value: string, index: number }
      const cols = state.orderOptions.orderSelectValues
      const orderSelectValuesReinit = cols
        .map((c: OrderSelectValue): OrderSelectValue => {
          const selectedPos = c.selectedPos === selectedPosCurrent ? -1 : c.selectedPos
          return {
            ...c,
            selectedPos
          }
        })
        .map((c: OrderSelectValue) => {
          const selectedPos = c.selectedPos > selectedPosCurrent && c.value === 'NONE' ? c.selectedPos - 1 : c.selectedPos

          return {
            ...c,
            selectedPos
          }
        })
      const orderSelectValues_ = orderSelectValuesReinit
        .map((c: OrderSelectValue): OrderSelectValue => {
          return {
            ...c,
            selectedPos: c.value === value ? selectedPosCurrent : c.selectedPos,
          }
        })
      const orderNeg = orderSelectValues_.filter((o) => o.selectedPos === -1)
      const orderPos = orderSelectValues_.filter((o) => o.selectedPos >= 0)
        .sort((a, b) => a.selectedPos - b.selectedPos)
        .map((o, i) => { return { ...o, selectedPos: i } })
      const orderSelectValues = [...orderPos, ...orderNeg]
      return {
        ...state,
        orderOptions: {
          ...state.orderOptions,
          orderSelectValues
        }
      }
    }

    case 'TOGGLE_ORDER_DIR':
      const newOrderSelectValue = action.payload as OrderSelectValue
      const orderSelectValues = state.orderOptions.orderSelectValues.map(
        (o: OrderSelectValue) =>
          o.value === newOrderSelectValue.value ? newOrderSelectValue : o
      )
      return {
        ...state,
        orderOptions: {
          orderSelectValues
        }
      }

    case 'TOGGLE_VIEW_COL':
      const colName = action.payload as string
      const sView = state.view

      const isColAmount = (colName === 'isColAmount' ? !sView.isColAmount : sView.isColAmount) || (colName === 'isColCat' && !sView.isColAmount && sView.isColCat)
      const isColCat = (colName === 'isColCat' ? !sView.isColCat : sView.isColCat) || (colName === 'isColAmount' && !sView.isColCat && sView.isColAmount)
      const isColDay = colName === 'isColDay' ? !sView.isColDay : sView.isColDay
      const isColMonth = colName === 'isColMonth' ? !sView.isColMonth : sView.isColMonth

      const isDetailDay_ = colName === 'isColMonth' ? (isColMonth || !isColDay) && isColDay : isColDay
      const isDetailMonth_ = colName === 'isColDay' ? (!isColDay || isColMonth ? isColMonth : true) : isColMonth

      return {
        ...state,
        view: {
          ...sView,
          isColAmount,
          isColCat,
          isColComment: colName === 'isColComment' ? !sView.isColComment : sView.isColComment,
          isColDateCreate: colName === 'isColDateCreate' ? !sView.isColDateCreate : sView.isColDateCreate,
          isColDateModif: colName === 'isColDateModif' ? !sView.isColDateModif : sView.isColDateModif,
          isColTemplate: colName === 'isColTemplate' ? !sView.isColTemplate : sView.isColTemplate,
          isColObj: colName === 'isColObj' ? !sView.isColObj : sView.isColObj,
          isColDay: isDetailDay_,
          isColMonth: isDetailMonth_

        }
      }

    case 'SET_MUOBJ':
      const muObjsApi = action.payload.mostUsedObjects as MostUsedObjectGql[]
      const mostUsedObjects = muObjsApi
        .map((o: MostUsedObjectGql): MostUsedObj => {
          const { nb, objId, objName, catId, catName } = o
          return {
            nbUse: nb,
            id: objId,
            name: objName,
            template: 0,
            cat: {
              id: catId,
              name: catName
            }
          }
        })
      return {
        ...state,
        mostUsedObjects
      }


    case 'ADDOBJECTINPUT':
      {
        const objectInput = {
          ...state.objectInput,
          objName: action.payload
        }
        return {
          ...state,
          objectInput
        }
      }

    case 'SET_OBJECT_AFTER_ADD':
      {
        const { id, name, cat } = action.payload
        const catId = parseInt(cat.id) as number
        const catById = getCatById(state.categories, catId)
        const objects = [
          ...state.objects,
          {
            id,
            name,
            template: 0,
            cat: catById
          }
        ]
        return {
          ...state,
          objects
        }
      }

    case 'SET_OBJECT_AFTER_MODIF':
      {
        const { id, name } = action.payload
        const objects = state.objects.map((o) => {
          return {
            ...o,
            name: o.id === id ? name : o.name
          }
        })
        return {
          ...state,
          objects
        }
      }

    default:
      return state
  }
}