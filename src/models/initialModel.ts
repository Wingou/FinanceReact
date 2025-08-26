import { CURRENT_DATE, ORDERDIR } from '../types/constants'
import { CategoryInput, ObjectInput, OrderOptions, OrderSelectValue, PriceInput, SearchOptions, StateType, ViewOptions } from '../types/common'

export const initialPriceInput: PriceInput = {
  priceId: -1,
  amount: '',
  actionDate: CURRENT_DATE,
  comment: '',
  template: 0,
  dateCreate: CURRENT_DATE,
  dateModif: CURRENT_DATE
}


export const initialObjectInput: ObjectInput = {
  objId: -1,
  objName: '',
  template: 0
}

export const initialCategoryInput: CategoryInput = {
  catId: -1,
  catName: '',
  position: 99,
  template: 0,
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
  isSearchReserved: true
}

const orderSelectValue = (name: string, value: string, dir: ORDERDIR, selectedPos: number): OrderSelectValue => {
  const val: OrderSelectValue = { name, value, dir, selectedPos }
  return val
}

export const initialOrderSelectValueHead = orderSelectValue('DATE', 'dateAction', 'DESC', 0)
export const initialOrderSelectValues: OrderSelectValue[] = [
  initialOrderSelectValueHead,
  orderSelectValue('OBJET', 'obj', 'DESC', -1),
  orderSelectValue('MONTANT', 'price', 'DESC', -1),
  orderSelectValue('CATEGORIE', 'cat', 'DESC', -1),
  orderSelectValue('DATE CREATE', 'dateCreate', 'DESC', -1),
  orderSelectValue('DATE MODIF', 'dateModif', 'DESC', -1),
  orderSelectValue('TYPE', 'template', 'DESC', -1),
]

export const initialOrderOptions: OrderOptions = {
  orderSelectValues: initialOrderSelectValues
}

export const initialView: ViewOptions = {
  page: 'HOME',
  isAddOpen: false,
  isLast: false,
  isColAmount: true,
  isColCat: true,
  isColComment: true,
  isColDateCreate: false,
  isColDateModif: true,
  isColTemplate: false,
  isColObj: true,
  isColDay: true,
  isColMonth: true
}

export const initialModel: StateType = {
  prices: [],
  objects: [],
  categories: [],
  years: [],
  months: [],
  searchOptions: initialSearchOptions,
  priceInput: initialPriceInput,
  objectInput: initialObjectInput,
  categoryInput: initialCategoryInput,
  view: initialView,
  orderOptions: initialOrderOptions
}

