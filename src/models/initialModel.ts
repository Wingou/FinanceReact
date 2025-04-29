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
  top: 10
}

const fakePrice = {
  "id": 15335,
  "amount": 1111,
  "actionDate": "2025-03-01 00:00:00",
  "comment": "COmment ça NNN",
  "dateCreate": "2025-03-31 23:59:52",
  "dateModif": "2025-03-31 23:59:52",
  "template": 0,
  "obj": {
    "id": 448,
    "name": "Ama Dao",
    "template": 0
  },
  "cat": {
    "id": 12,
    "name": "Restau",
    "position": 2,
    "template": 0
  }
}
export const initialModel: StateType = {
  prices: [fakePrice],
  objects: [],
  categories: [],
  years: [],
  months: MONTHS.map((m, index) => {
    return {
      name: m,
      month: index + 1,
      isOn: index + 1 === CURRENT_MONTH
    }
  }),
  searchOptions: initialSearchOptions,
  addPriceInput: initialAddPriceInput,
  modifPriceInput: initialModifPriceInput,
  view: {
    page: 'HOME',
    isAddOpen: false
  }
}
