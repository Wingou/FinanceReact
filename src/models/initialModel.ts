import {
  CURRENT_DATE,
  CURRENT_MONTH,
  MONTHS
} from '../constants/constants'
import { AddPriceInput, SearchOptions, StateType } from '../types/common'

export const initialAddPriceInput : AddPriceInput= {
  catId: -1,
  objId: -1,
  priceValue: '',
  actionDate: CURRENT_DATE,
  comment: ''
}

export const initialSearchOptions:SearchOptions = {
  isMultiYears: false,
  isMultiMonths: false,
  isMultiCats: true,
  searchWord: '',
  searchMin: null,
  searchMax: null,
  top: 10
}

export const initialModel:StateType = {
  prices: [],
  objects: [],
  categories: [],
  years: [],
  months: MONTHS.map((m, index) => {
    return {
      name: m,
      month: index + 1,
      filtered: index + 1 === CURRENT_MONTH
    }
  }),
  searchOptions: initialSearchOptions,
  addPriceInput: initialAddPriceInput,
  view: 'HOME'
}
