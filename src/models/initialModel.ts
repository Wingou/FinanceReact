import {
  CURRENT_DATE,
  PAGE
} from '../types/constants'
import { AddPriceInput, ModifPriceInput, OrderOptions, SearchOptions, StateType, ViewOptions, } from '../types/common'

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
  lastMutatedPriceId: -1,
  isSearchDeleted: false,
  isSearchReserved: false
}

export const initialOrderOptions: OrderOptions = {
  orderSelectValues: [
    { name: 'DATE', value: 'dateAction', dir: 'DESC', selectedPos: 0 },
    { name: 'OBJET', value: 'obj', dir: 'DESC', selectedPos: -1 },
    { name: 'MONTANT', value: 'price', dir: 'DESC', selectedPos: -1 },
    { name: 'CATEGORIE', value: 'cat', dir: 'DESC', selectedPos: -1 },
    { name: 'DATE CREATE', value: 'dateCreate', dir: 'DESC', selectedPos: -1 },
    { name: 'DATE MODIF', value: 'dateModif', dir: 'DESC', selectedPos: -1 },
    { name: 'TYPE', value: 'template', dir: 'DESC', selectedPos: -1 },
  ]
}

const initialView: ViewOptions = {
  page: 'HOME' as PAGE,
  isAddOpen: false,
  isLast: false,
  isColObj: true,
  isColAmount: true,
  isColCat: true,
  isColComment: false,
  isColDateCreate: false,
  isColDateModif: true,
  isColTemplate: false
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
  view: initialView,
  orderOptions: initialOrderOptions,
  mostUsedObjects: []
}

