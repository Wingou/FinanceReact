import { catNone, objNone, CURRENT_DATE_TIME, CURRENT_YEAR, CURRENT_MONTH, MONTHS, CALLER } from '../types/constants'
import { initialPriceInput, initialModel, initialOrderOptions } from '../models/initialModel'
import { ActionType, Categorie, CategoryInput, PriceInput, Month, Object, ObjectInput, Price, SearchOptions, StateType, ViewOptions, Year, OrderOption } from '../types/common'
import { CatGql, ObjGql, PriceGql, YearGql } from '../types/graphql'
import { formatCalendarDate, getCatById } from '../utils/helper'
import { CatRaw, ObjRaw } from '../types/reducer'

export const mainReducer = (state: StateType = initialModel, action: ActionType) => {
  switch (action.type) {
    case '@@INIT': {
      const months: Month[] = MONTHS.map((m: string, index: number): Month => {
        const name: string = m
        const month: number = index + 1
        const isOn: boolean = index + 1 === CURRENT_MONTH
        return {
          name,
          month,
          isOn
        }
      })
      const newState: StateType = {
        ...initialModel,
        months
      }
      return newState
    }

    case 'SET_CATEGORIES': {
      const categoriesApi: CatGql[] = action.payload.categories
      const categories: Categorie[] = categoriesApi
        .map((c: CatGql): Categorie => {
          const { id, position, template, nbChild } = c
          return {
            ...c,
            id: parseInt(id),
            position,
            template,
            recette: 0,
            depense: 0,
            reserve: 0,
            isDisplayed: false,
            isOn: true,
            nbChild
          }
        })
        .concat(catNone)
      const newState: StateType = {
        ...state,
        categories
      }
      return newState
    }

    case 'SET_OBJECTS': {
      const objectsApi: ObjGql[] = action.payload.objects
      const objects: Object[] = objectsApi.map((o: ObjGql): Object => {
        const { id, template, cat, nbChild } = o
        const { id: catId } = cat
        const cat_: Categorie = getCatById(state.categories, parseInt(catId))
        return {
          ...o,
          id: parseInt(id),
          template,
          cat: cat_,
          nbChild
        }
      })
        .concat(objNone)
      const newState: StateType = {
        ...state,
        objects
      }
      return newState
    }

    case 'SET_YEARS': {
      const years: YearGql[] = action.payload.years
      const newState: StateType = {
        ...state,
        years: years.map((y: YearGql): Year => {
          const { name: yearStr } = y
          const yNum: number = parseInt(yearStr)
          const year: number = isNaN(yNum) ? 0 : yNum
          const isOn: boolean = year === CURRENT_YEAR
          const name_: string = yearStr
          return {
            year,
            name: name_,
            isOn
          }
        })
      }
      return newState
    }

    case 'SET_PRICES': {
      const prices: PriceGql[] = action.payload
      const displayedCatIds: number[] = [...new Set(prices.map((p: PriceGql): number => parseInt(p.cat.id)))]
      const categories: Categorie[] = state.categories.map((cat: Categorie): Categorie => {
        const isDisplayed: boolean = displayedCatIds.includes(cat.id)
        return {
          ...cat,
          isDisplayed
        }
      })
      const prices_: Price[] = prices.map((p: PriceGql): Price => {
        const { id, amount, comment, obj, cat } = p
        const comment_: string = comment ?? ''
        const id_: number = parseInt(id)
        const amount_ = parseFloat(amount)
        const isGroupby: boolean = false
        const obj_: ObjRaw = {
          ...p.obj,
          id: parseInt(obj.id)
        }
        const cat_: CatRaw = {
          ...p.cat,
          id: parseInt(cat.id)
        }
        return {
          ...p,
          id: id_,
          amount: amount_,
          comment: comment_,
          isGroupby,
          obj: obj_,
          cat: cat_
        }
      })
      const newState: StateType = {
        ...state,
        prices: prices_,
        categories
      }
      return newState
    }

    case 'UPDATE_MONTH': {
      const { months, searchOptions } = state
      const { month, isOn }: { month: number, isOn: boolean } = action.payload
      const { isMultiMonths } = searchOptions
      const isCheckedMonthIsOnly: boolean =
        months.filter(m => m.isOn === isOn).length === 1
      const months_: Month[] = months.map((m: Month): Month => {
        const isOn_: boolean = isMultiMonths
          ? m.month === month
            ? isCheckedMonthIsOnly
              ? true : isOn
            : m.isOn
          : m.month === month
        return {
          ...m,
          isOn: isOn_
        }
      })
      const newState: StateType = {
        ...state,
        months: months_
      }
      return newState
    }

    case 'UPDATE_YEAR': {
      const { years, searchOptions } = state
      const { year, isOn }: { year: number, isOn: boolean } = action.payload
      const { isMultiYears } = searchOptions
      const isCheckedYearIsOnly: boolean = years.filter(y => y.isOn).length === 1
      const years_: Year[] = years.map((y: Year): Year => {
        const isOn_: boolean = isMultiYears
          ? y.year === year
            ? isCheckedYearIsOnly || isOn
            : y.isOn
          : y.year === year
        return {
          ...y,
          isOn: isOn_
        }
      })
      const newState: StateType = {
        ...state,
        years: years_
      }
      return newState
    }

    case 'UPDATE_ALL_YEARS': {
      const { isAllYearsChecked }: { isAllYearsChecked: boolean } = action.payload
      const years: Year[] = state.years.map((y: Year): Year => {
        const isOn: boolean = y.name === CURRENT_YEAR.toString() || isAllYearsChecked
        return {
          ...y,
          isOn
        }
      })
      const searchOptions: SearchOptions = {
        ...state.searchOptions,
        isMultiYears: isAllYearsChecked
      }
      const newState: StateType = {
        ...state,
        years,
        searchOptions
      }
      return newState
    }

    case 'UPDATE_ALL_MONTHS': {
      const { isAllMonthsChecked }: { isAllMonthsChecked: boolean } = action.payload
      const months: Month[] = state.months.map((m: Month): Month => {
        const isOn: boolean = m.month === CURRENT_MONTH || isAllMonthsChecked
        return {
          ...m,
          isOn
        }
      })
      const searchOptions: SearchOptions = {
        ...state.searchOptions,
        isMultiMonths: isAllMonthsChecked
      }
      const newState: StateType = {
        ...state,
        months,
        searchOptions
      }
      return newState
    }

    case 'UPDATE_FILTERED_CAT': {
      const { categories, searchOptions } = state
      const { isMultiCats } = searchOptions
      const { checked, catId }: { checked: boolean, catId: number } = action.payload
      const categories_: Categorie[] = categories.map((c: Categorie): Categorie => {
        const isOn: boolean = isMultiCats
          ? c.id === Number(catId)
            ? checked
            : c.isOn
          : c.id === Number(catId)
        return {
          ...c,
          isOn
        }
      })
      const newState: StateType = {
        ...state,
        categories: categories_
      }
      return newState
    }

    case 'UPDATE_ALL_CATS': {
      const isMultiCatsPayload: boolean = action.payload
      const { searchOptions, categories } = state
      const { isMultiCats } = searchOptions
      const categories_: Categorie[] = categories.map((c: Categorie): Categorie => {
        return {
          ...c,
          isOn: isMultiCatsPayload
        }
      })
      const isMultiCats_: boolean = isMultiCatsPayload || isMultiCats
      const searchOptions_: SearchOptions = {
        ...searchOptions,
        isMultiCats: isMultiCats_
      }
      const newState: StateType = {
        ...state,
        categories: categories_,
        searchOptions: searchOptions_
      }
      return newState
    }

    case 'UPDATE_MULTIPLE_YEARS': {
      const isMultiYears: boolean = action.payload
      const searchOptions: SearchOptions = {
        ...state.searchOptions,
        isMultiYears
      }
      const newState: StateType = {
        ...state,
        searchOptions
      }
      return newState
    }

    case 'UPDATE_MULTIPLE_MONTHS': {
      const isMultiMonths: boolean = action.payload
      const searchOptions: SearchOptions = {
        ...state.searchOptions,
        isMultiMonths
      }
      const newState: StateType = {
        ...state,
        searchOptions
      }
      return newState
    }

    case 'UPDATE_MULTIPLE_CATS': {
      const isMultiCats: boolean = action.payload
      const searchOptions: SearchOptions = {
        ...state.searchOptions,
        isMultiCats
      }
      const newState: StateType = {
        ...state,
        searchOptions
      }
      return newState
    }

    case 'UPDATE_SEARCH_WORD': {
      const searchWord: string = action.payload
      const searchOptions: SearchOptions = {
        ...state.searchOptions,
        searchWord
      }
      const newState: StateType = {
        ...state,
        searchOptions
      }
      return newState
    }

    case 'UPDATE_SEARCH_MIN': {
      const searchMinPayload: string = action.payload
      const searchMin: number = parseInt(searchMinPayload)
      const searchMin_: number | null = isNaN(searchMin) ? null : searchMin
      const searchOptions: SearchOptions = {
        ...state.searchOptions,
        searchMin: searchMin_
      }
      const newState: StateType = {
        ...state,
        searchOptions
      }
      return newState
    }

    case 'UPDATE_SEARCH_MAX': {
      const searchMaxPayload: string = action.payload
      const searchMax: number = parseInt(searchMaxPayload)
      const searchMax_: number | null = isNaN(searchMax) ? null : searchMax
      const searchOptions: SearchOptions = {
        ...state.searchOptions,
        searchMax: searchMax_
      }
      const newState: StateType = {
        ...state,
        searchOptions
      }
      return newState
    }

    case 'UPDATE_SEARCH_DEL': {
      const isSearchDeleted: boolean = action.payload
      const searchOptions: SearchOptions = {
        ...state.searchOptions,
        isSearchDeleted
      }
      const newState: StateType = {
        ...state,
        searchOptions
      }
      return newState
    }

    case 'UPDATE_SEARCH_RESERVED': {
      const isSearchReserved: boolean = action.payload
      const searchOptions: SearchOptions = {
        ...state.searchOptions,
        isSearchReserved
      }
      const newState: StateType = {
        ...state,
        searchOptions
      }
      return newState
    }

    case 'TO_HOME': {
      const view: ViewOptions = {
        ...state.view,
        isAddOpen: false,
        isLast: false,
        page: 'HOME'
      }
      const newState: StateType = {
        ...state,
        view
      }
      return newState
    }

    case 'TOGGLE_ADD': {
      const isAddOpen: boolean = !state.view.isAddOpen
      const view: ViewOptions = {
        ...state.view,
        isAddOpen,
        page: 'BOARD'
      }
      const newState: StateType = {
        ...state,
        view
      }
      return newState
    }

    case 'TOGGLE_LAST': {
      const isLast: boolean = !state.view.isLast
      const view: ViewOptions = {
        ...state.view,
        isLast,
        page: 'BOARD'
      }
      const newState: StateType = {
        ...state,
        view
      }
      return newState
    }

    case 'TO_BOARD': {
      const view: ViewOptions = {
        ...state.view,
        page: 'BOARD'
      }
      const newState: StateType = {
        ...state,
        view
      }
      return newState
    }

    case 'SET_CATID': {
      const catId: string = action.payload
      const { objectInput, categoryInput } = state
      const catId_: number = parseInt(catId)
      const catName: string = getCatById(state.categories, catId_).name
      const objectInput_: ObjectInput = {
        ...objectInput,
        objId: -1,
        objName: ''
      }
      const categoryInput_: CategoryInput = {
        ...categoryInput,
        catId: catId_,
        catName
      }
      const newState: StateType = {
        ...state,
        objectInput: objectInput_,
        categoryInput: categoryInput_
      }
      return newState
    }

    case 'SET_OBJID': {
      const objId: string = action.payload
      const { objects, categories } = state
      const objId_: number = parseInt(objId)
      const objects_: Object[] = objects.filter(o => o.id === objId_)
      const objectHead = objects_.length > 0 ? objects_[0] : objNone
      const { id: objId__, name: objName, template: objTemplate } = objectHead
      const catId = objectHead.cat.id
      const category: Categorie = getCatById(categories, catId)
      const { id: catId_, name: catName, position, template: catTemplate } = category
      const categoryInput_: CategoryInput = {
        catId: catId_,
        catName,
        position,
        template: catTemplate
      }
      const objectInput_: ObjectInput = {
        objId: objId__,
        objName,
        template: objTemplate
      }
      const newState: StateType = {
        ...state,
        objectInput: objectInput_,
        categoryInput: categoryInput_
      }
      return newState
    }

    case 'ADDPRICEINPUT_SET_DATE': {
      const actionDate: string = action.payload
      const priceInput: PriceInput = {
        ...state.priceInput,
        actionDate
      }
      const newState: StateType = {
        ...state,
        priceInput
      }
      return newState
    }

    case 'ADDPRICEINPUT_SET_PRICE': {
      const amount: string = action.payload
      const priceInput: PriceInput = {
        ...state.priceInput,
        amount
      }
      const newState: StateType = {
        ...state,
        priceInput
      }
      return newState
    }

    case 'ADDPRICEINPUT_SET_COMMENT': {
      const comment: string = action.payload
      const priceInput: PriceInput = {
        ...state.priceInput,
        comment
      }
      const newState: StateType = {
        ...state,
        priceInput
      }
      return newState
    }

    case 'SET_PRICES_AFTER_ADD': {
      const newPrice: PriceGql = action.payload
      const { id, amount, comment, actionDate, obj, cat } = newPrice
      const comment_: string = comment ?? ''
      const { id: objId, name: objName } = obj
      const { id: catId, name: catName } = cat
      const categories: Categorie[] = state.categories.map((c: Categorie): Categorie => {
        return c.id === parseInt(catId) ? { ...c, isOn: true, isDisplayed: true } : c
      })
      const isMultiCats: boolean = categories.filter((c: Categorie): boolean => c.isOn).length > 1
      const prices: Price[] = [...state.prices,
      {
        id: Number(id),
        amount: Number(amount),
        comment: comment_,
        actionDate,
        template: 0,
        dateCreate: CURRENT_DATE_TIME,
        dateModif: CURRENT_DATE_TIME,
        obj: { id: Number(objId), name: objName, template: 0 },
        cat: { id: Number(catId), name: catName, template: 0, position: 99 },
        isGroupby: false
      }
      ]
      const priceInput: PriceInput = {
        ...state.priceInput,
        amount: '',
        comment: ''
      }
      const searchOptions: SearchOptions = {
        ...state.searchOptions,
        isMultiCats,
        lastMutatedPriceId: parseInt(id)
      }
      const newState: StateType = {
        ...state,
        prices,
        priceInput,
        searchOptions,
        categories
      }
      return newState
    }

    case 'MODIFPRICEINPUT': {
      const payload: { priceInput: PriceInput, objectInput: ObjectInput, categoryInput: CategoryInput } = action.payload
      const { priceInput, objectInput, categoryInput } = payload
      const { actionDate } = priceInput

      const actionDate_: string = formatCalendarDate(actionDate)
      const priceInput_: PriceInput = {
        ...priceInput,
        actionDate: actionDate_
      }
      const view: ViewOptions = {
        ...state.view,
        isAddOpen: false,
        isColAmount: true
      }
      const newState: StateType = {
        ...state,
        priceInput: priceInput_,
        view,
        objectInput,
        categoryInput
      }
      return newState
    }

    case 'MODIFPRICEINPUT_SET_DATE': {
      const actionDate: string = action.payload
      const priceInput: PriceInput = {
        ...state.priceInput,
        actionDate
      }
      const newState: StateType = {
        ...state,
        priceInput
      }
      return newState
    }

    case 'MODIFPRICEINPUT_SET_PRICE': {
      const amount: string = action.payload
      const priceInput: PriceInput = {
        ...state.priceInput,
        amount
      }
      const newState: StateType = {
        ...state,
        priceInput
      }
      return newState
    }

    case 'MODIFPRICEINPUT_SET_COMMENT': {
      const comment: string = action.payload
      const priceInput: PriceInput = {
        ...state.priceInput,
        comment
      }
      const newState: StateType = {
        ...state,
        priceInput
      }
      return newState
    }

    case 'SET_PRICES_AFTER_MODIF': {
      const modifPrice: PriceGql = action.payload
      const { id: priceId, amount, comment, actionDate, obj, cat, template, dateModif } = modifPrice
      const comment_: string = comment ?? ''
      const { id: objId, name: objName } = obj
      const { id: catId, name: catName, position } = cat
      const objId_: number = parseInt(objId)
      const catId_: number = parseInt(catId)
      const categories: Categorie[] = state.categories.map((c: Categorie): Categorie => {
        return c.id === parseInt(catId) ? { ...c, isOn: true, isDisplayed: true } : c
      })
      const isMultiCats = categories.filter((c: Categorie): boolean => c.isOn).length > 1
      const lastMutatedPriceId: number = parseInt(priceId)
      const prices: Price[] = state.prices.map((p: Price): Price => {
        const amount_: number = parseFloat(amount)
        const obj: ObjRaw = { id: objId_, name: objName, template: 0 }
        const cat: CatRaw = { id: catId_, name: catName, template: 0, position }
        return p.id === lastMutatedPriceId ?
          {
            ...p,
            amount: amount_,
            comment: comment_,
            actionDate,
            dateModif,
            template,
            obj,
            cat
          }
          : p
      })
      const searchOptions: SearchOptions = {
        ...state.searchOptions,
        isMultiCats,
        lastMutatedPriceId
      }
      const newState: StateType = {
        ...state,
        prices,
        priceInput: initialPriceInput,
        searchOptions,
        categories
      }
      return newState
    }

    case 'CANCEL_INPUT': {
      const caller: CALLER = action.payload
      const searchOptions_: SearchOptions = {
        ...state.searchOptions,
        searchWord: '',
        searchMin: null,
        searchMax: null,
      }
      const priceInput: PriceInput = caller === 'MODIF_PRICE' || caller === 'ADD' ? initialPriceInput : state.priceInput
      const searchOptions: SearchOptions = caller === 'SEARCH' ? searchOptions_ : state.searchOptions
      const orderOptions: OrderOption[] = caller === 'ORDER' ? initialOrderOptions : state.orderOptions
      const newState: StateType = {
        ...state,
        priceInput,
        searchOptions,
        orderOptions
      }
      return newState
    }

    case 'UPDATE_ORDER_INPUT': {
      const { value, index: selectedPosCurrent }: { value: string, index: number } = action.payload
      const cols = state.orderOptions
      const orderInitiatedOptions: OrderOption[] = cols.map((c: OrderOption): OrderOption => {
        const selectedPos: number = c.selectedPos === selectedPosCurrent
          ? -1
          : c.selectedPos
        return {
          ...c,
          selectedPos
        }
      })
        .map((c: OrderOption) => {
          const selectedPos: number = c.selectedPos > selectedPosCurrent && c.value === 'NONE'
            ? c.selectedPos - 1
            : c.selectedPos
          return {
            ...c,
            selectedPos
          }
        })
      const orderOptions_: OrderOption[] = orderInitiatedOptions
        .map((c: OrderOption): OrderOption => {
          const selectedPos: number = c.value === value ? selectedPosCurrent : c.selectedPos
          return {
            ...c,
            selectedPos,
          }
        })
      const orderNeg: OrderOption[] = orderOptions_.filter((o) => o.selectedPos === -1)
      const orderPos: OrderOption[] = orderOptions_.filter((o) => o.selectedPos >= 0)
        .sort((a, b) => a.selectedPos - b.selectedPos)
        .map((o, i) => { return { ...o, selectedPos: i } })
      const orderOptions: OrderOption[] = [...orderPos, ...orderNeg]
      const newState: StateType = {
        ...state,
        orderOptions
      }
      return newState
    }

    case 'TOGGLE_ORDER_DIR': {
      const newOrderSelectOption: OrderOption = action.payload
      const orderOptions: OrderOption[] = state.orderOptions
        .map((o: OrderOption): OrderOption =>
          o.value === newOrderSelectOption.value ? newOrderSelectOption : o
        )
      const newState: StateType = {
        ...state,
        orderOptions
      }
      return newState
    }

    case 'TOGGLE_VIEW_COL': {
      const colName: string = action.payload
      const sView: ViewOptions = state.view
      const isColAmount: boolean = (colName === 'isColAmount' ? !sView.isColAmount : sView.isColAmount) || (colName === 'isColCat' && !sView.isColAmount && sView.isColCat)
      const isColCat: boolean = (colName === 'isColCat' ? !sView.isColCat : sView.isColCat) || (colName === 'isColAmount' && !sView.isColCat && sView.isColAmount)
      const isColDay: boolean = colName === 'isColDay' ? !sView.isColDay : sView.isColDay
      const isColMonth: boolean = colName === 'isColMonth' ? !sView.isColMonth : sView.isColMonth
      const isDetailDay_: boolean = colName === 'isColMonth' ? (isColMonth || !isColDay) && isColDay : isColDay
      const isDetailMonth_: boolean = colName === 'isColDay' ? (!isColDay || isColMonth ? isColMonth : true) : isColMonth
      const view: ViewOptions = {
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
      const newState: StateType = {
        ...state,
        view
      }
      return newState
    }

    case 'ADDOBJECTINPUT': {
      const objName: string = action.payload
      const objectInput: ObjectInput = {
        ...state.objectInput,
        objName
      }
      const newState: StateType = {
        ...state,
        objectInput
      }
      return newState
    }

    case 'SET_OBJECT_AFTER_ADD': {
      const { id, name, cat: catId }: { id: string, name: string, cat: string } = action.payload
      const objId: number = parseInt(id)
      const catId_: number = parseInt(catId)
      const catById: Categorie = getCatById(state.categories, catId_)
      const cat: CatRaw = {
        id: catId_,
        name: catById.name,
        position: catById.position,
        template: catById.template
      }
      const newObj: Object = {
        id: objId,
        name,
        template: 0,
        cat,
        nbChild: 0
      }
      const objects: Object[] = [...state.objects, newObj]
      const newState: StateType = {
        ...state,
        objects
      }
      return newState
    }

    case 'SET_OBJECT_AFTER_MODIF': {
      const { id, name, template }: { id: number, name: string, template: number } = action.payload
      const objects: Object[] = state.objects
        .map((o: Object): Object => {
          const name_: string = o.id === id ? name : o.name
          const template_: number = o.id === id ? template : o.template
          return {
            ...o,
            name: name_,
            template: template_
          }
        })
      const newState: StateType = {
        ...state,
        objects
      }
      return newState
    }

    case 'ADDCATEGORYINPUT': {
      const catName: string = action.payload
      const categoryInput: CategoryInput = {
        ...state.categoryInput,
        catName
      }
      const newState: StateType = {
        ...state,
        categoryInput
      }
      return newState
    }

    case 'SET_CATEGORY_AFTER_ADD': {
      const categoryInput: CategoryInput = action.payload
      const { catId, catName, template, position } = categoryInput
      const cat: Categorie = {
        id: catId,
        name: catName,
        position,
        template,
        recette: 0,
        depense: 0,
        reserve: 0,
        isDisplayed: true,
        isOn: true,
        nbChild: 0
      }
      const categories: Categorie[] = [...state.categories, cat]
      const newState: StateType = {
        ...state,
        categories,
        categoryInput
      }
      return newState
    }

    case 'SET_CATEGORY_AFTER_MODIF': {
      const { id, name, position, template }: CatGql = action.payload
      const catId: number = parseInt(id)
      const categories: Categorie[] = state.categories
        .map((c: Categorie): Categorie => {
          const name_: string = c.id === catId ? name : c.name
          const position_: number = c.id === catId ? position : c.position
          const template_: number = c.id === catId ? template : c.template
          return {
            ...c,
            name: name_,
            position: position_,
            template: template_
          }
        })
      const newState: StateType = {
        ...state,
        categories
      }
      return newState
    }

    default:
      return state
  }
}