import { AddPriceInput, Categorie, CategoryInput, ModifPriceInput, Month, Object, ObjectInput, OrderOptions, Price, SearchOptions, ViewOptions, Year } from '../../types/common'

export interface BoardViewProps {
  years: Year[],
  months: Month[],
  filteredPrices: Price[],
  displayedCats: Categorie[],
  selectedCats: Categorie[],
  isAllYearsChecked: boolean,
  isAllMonthsChecked: boolean,
  isAllCatsChecked: boolean,
  searchOptions: SearchOptions,
  objects: Object[],
  categories: Categorie[],
  modifPriceInput: ModifPriceInput,
  isAddOpen: boolean,
  addPriceInput: AddPriceInput,
  isLast: boolean,
  orderOptions: OrderOptions,
  view: ViewOptions,
  nbObjPerCats: NbObjPerCat[],
  categoryInput: CategoryInput,
  objectInput: ObjectInput
}

export interface NbObjPerCat {
  catId: number,
  nbActivatedObj: number,
  nbReservedObj: number,
  nbDeletedObj: number
}

export interface SimpleLineProps {
  price: Price,
  index: number
}

export interface TitleAmountMapString {
  RECETTE: string,
  DEPENSE: string,
  RESERVE: string,
  TOTAL: string
}

export interface TitleAmountMapPrices {
  RECETTE: Price[],
  DEPENSE: Price[],
  RESERVE: Price[],
  TOTAL: Price[]
}