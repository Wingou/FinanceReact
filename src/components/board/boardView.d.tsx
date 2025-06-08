import { AddPriceInput, Categorie, ModifPriceInput, Month, MostUsedObj, Object, OrderOptions, Price, SearchOptions, ViewOptions, Year } from '../../types/common'
import { SUM_TYPE } from '../../types/constants'

export interface BoardProps {
  filteredPrices: Price[],
  selectedCats: Categorie[],
  modifPriceInput: ModifPriceInput,
  objects: Object[],
  lastMutatedPriceId: number,
  addLineProps: AddLineProps,
  isSearchReserved: boolean,
  view: ViewOptions,
  mostUsedObjs: MostUsedObj[]
}

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
  mostUsedObjs: MostUsedObj[],
  categories: Categorie[],
  modifPriceInput: ModifPriceInput,
  isAddOpen: boolean,
  addPriceInput: AddPriceInput,
  isLast: boolean,
  orderOptions: OrderOptions,
  view: ViewOptions,
  nbObjPerCats: NbObjPerCat[]
}

export interface NbObjPerCat {
  catId: number,
  nbActivatedObj: number,
  nbReservedObj: number,
  nbDeletedObj: number
}



export interface ModifLineProps {
  modifPriceInput: ModifPriceInput,
  objects: Object[],
  selectedCats: Categorie[],
  lastMutatedPriceId: number,
  view: ViewOptions,
  mostUsedObjs: MostUsedObj[]
}

export interface AddLineProps {
  addPriceInput: AddPriceInput,
  categories: Categorie[],
  isAddOpen: boolean
}

export interface SumLineProps { selectedCats: Categorie[], sumType: SUM_TYPE, view: ViewOptions }
export interface SimpleLineProps { selectedCats: Categorie[], p: Price, index: number, lastMutatedPriceId: number, view: ViewOptions }

export interface TitleAmountMap {
  RECETTE: string,
  DEPENSE: string,
  RESERVE: string
  TOTAL: string
}

export interface BodyLineProps {
  filteredPrices: Price[],
  selectedCats: Categorie[],
  modifPriceInput: ModifPriceInput,
  objects: Object[],
  categories: Categorie[],
  lastMutatedPriceId: number,
  isAddOpen: boolean,
  addPriceInput: AddPriceInput,
  view: ViewOptions,
  mostUsedObjs: MostUsedObj[]
}

export interface HeaderLineProps {
  selectedCats: Categorie[],
  view: ViewOptions
}

export interface ActivatedCatsInputProps {
  displayedCats: Categorie[]
  isMultiCats: boolean
  isAllCatsChecked: boolean
  nbObjPerCats: NbObjPerCat[],
  isSearchReserved: boolean,
  isSearchDeleted: boolean,
}

export interface SearchInputCatProps {
  props: ActivatedCatsInputProps
}



export interface SearchWordInputProps {
  searchWord: string,
  searchMin: number | null,
  searchMax: number | null,
  isPricesFound: boolean
}



export interface OrderInputProps {
  orderOptions: OrderOptions
}

export interface ColumnInputProps {
  searchWord: string,
  isSearchDeleted: boolean,
  isSearchReserved: boolean,
  view: ViewOptions,
  isPricesFound: boolean
}

export interface GroupByInputProps {
  searchWord: string,
  isSearchDeleted: boolean,
  isSearchReserved: boolean,
  view: ViewOptions,
  isPricesFound: boolean
}