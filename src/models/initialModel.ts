import {
  CURRENT_DATE,
  CURRENT_MONTH,
  MONTHS
} from '../constants/constants'
import { AddPriceInput, ModifPriceInput, SearchOptions, StateType, } from '../types/common'

export const initialModifPriceInput: ModifPriceInput = {
  id: -1,
  catId: -1,
  objId: -1,
  amount: '',
  actionDate: CURRENT_DATE,
  comment: '',
  dateCreate: CURRENT_DATE,
  dateModif: CURRENT_DATE,
  template: 0
}

export const initialAddPriceInput: AddPriceInput = {
  catId: -1,
  objId: -1,
  amount: '',
  actionDate: CURRENT_DATE,
  comment: ''
}

export const initialSearchOptions: SearchOptions = {
  isMultiYears: false,
  isMultiMonths: false,
  isMultiCats: true,
  searchWord: '',
  searchMin: null,
  searchMax: null,
  top: 10,
  lastMutatedPriceId: -1
}

export const initialModel: StateType = {
  prices: [],
  objects: [],
  categories: [],
  years: [],
  months: [],
  searchOptions: initialSearchOptions,
  addPriceInput: initialAddPriceInput,
  modifPriceInput: initialModifPriceInput,
  view: {
    page: 'HOME',
    isAddOpen: false
  }
}
