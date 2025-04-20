import { PAGE } from "../constants/constants";
import { CatRaw, ObjRaw, PriceRaw } from "./reducer";

export interface StateType {
  prices: Price[],
  objects: Object[],
  categories: Categorie[],
  years: Year[],
  months: Month[],
  searchOptions: SearchOptions,
  addPriceInput: AddPriceInput,
  view: {
    page: PAGE,
    isAddOpen: boolean
  }
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
  top: number
}

export interface AddPriceInput {
  catId: number,
  objId: number,
  amount: string,
  actionDate: string,
  comment: string
}

export interface Categorie extends CatRaw {
  recette: number,
  depense: number,
  isDisplayed: boolean
  isOn: boolean,
}

export interface Object extends ObjRaw {
  cat: CatRaw
}

export interface Price extends PriceRaw {
  obj: ObjRaw,
  cat: CatRaw
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