import { PAGE } from "./constants";
import { CatRaw, ObjRaw, PriceRaw } from "./reducer";

export interface StateType {
  prices: Price[],
  objects: Object[],
  categories: Categorie[],
  years: Year[],
  months: Month[],
  searchOptions: SearchOptions,
  addPriceInput: AddPriceInput,
  modifPriceInput: ModifPriceInput,
  objectInput: ObjectInput,
  categoryInput: CategoryInput,
  view: ViewOptions,
  orderOptions: OrderOptions
}

export interface ViewOptions {
  page: PAGE,
  isAddOpen: boolean,
  isLast: boolean,
  isColAmount: boolean,
  isColCat: boolean,
  isColComment: boolean,
  isColDateCreate: boolean,
  isColDateModif: boolean,
  isColTemplate: boolean,
  isColObj: boolean,
  isColDay: boolean,
  isColMonth: boolean
}

export interface ActionType {
  type: string,
  payload: any
}

export interface SearchOptions {
  isMultiYears: boolean,
  isMultiMonths: boolean,
  isMultiCats: boolean,
  searchWord: string,
  searchMin: number | null,
  searchMax: number | null,
  top: number,
  lastMutatedPriceId: number,
  isSearchDeleted: boolean,
  isSearchReserved: boolean
}

export interface AddPriceInput {
  amount: string,
  actionDate: string,
  comment: string,
  catId: number,
  objId: number
}

export interface ObjectInput {
  objId: number,
  catId: number,
  objName: string,
  template: number
}

export interface CategoryInput {
  catId: number,
  catName: string,
  template: number,
  position: number
}

export interface ModifPriceInput {
  id: number,
  amount: string,
  actionDate: string,
  comment: string,
  dateCreate: string,
  dateModif: string,
  template: number,
  catId: number,
  objId: number
}

export interface Categorie extends CatRaw {
  recette: number,
  depense: number,
  reserve: number,
  isDisplayed: boolean,
  isOn: boolean,
  nbChild: number
}

export interface Object extends ObjRaw {
  cat: CatRaw,
  nbChild: number
}

export interface Price extends PriceRaw {
  obj: ObjRaw,
  cat: CatRaw,
  isGroupby: boolean
}

export interface Year {
  year: number,
  name: string,
  isOn: boolean
}

export interface Month {
  month: number,
  name: string,
  isOn: boolean
}

export interface OrderOptions {
  orderSelectValues: OrderSelectValue[],
}

export interface OrderSelectValue {
  name: string,
  value: string,
  dir: ORDERDIR,
  selectedPos: number
}