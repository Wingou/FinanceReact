import { VIEW } from "../constants/constants";

export interface StateType {
  prices: Price[],
  objects: Object[],
  categories: Categorie[],
  years: Year[],
  months: Month[],
  searchOptions: SearchOptions,
  view: VIEW,
  addPriceInput: AddPriceInput
}

export interface AddPriceInput {
  catId: number,
  objId: number,
  priceValue: string,
  actionDate: string,
  comment: string
}

export interface Price {
  id: number,
  priceValue: number;
  actionDate: string,
  comment: string,
  objId: number,
  objName: string,
  template: number,
  dateCreate: string,
  dateModif: string
  catId: number,
  catName: string
}

export interface Object {
  id: number,
  catId: number,
  objName: string,
  template: number,
  catName: string
}

export interface Categorie {
  id: number,
  catName: string,
  position: number,
  template: number,
  filtered: boolean,
  recette: number,
  depense: number,
  activated: boolean
}

export interface Year {
  year: number,
  name: string,
  filtered: boolean
}

export interface Month {
  month: number,
  name: string,
  filtered: boolean
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

export interface State {
  prices: Price[],
  objects: Object[],
  categories: Categorie[],
  years: Year[],
  months: Month[],
  searchOptions: SearchOptions,
  view: VIEW,
  addPriceInput: AddPriceInput
}
