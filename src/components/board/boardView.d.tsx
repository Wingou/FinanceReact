import { AddPriceInput, Categorie, ModifPriceInput, Month, Object, Price, SearchOptions, Year } from '../../types/common'
import { SUM_TYPE } from '../../constants/constants'

export interface BoardProps {
  filteredPrices: Price[],
  filteredCats: Categorie[],
  modifLineProps: ModifLineProps,
  addLineProps: AddLineProps,
}

export interface BoardViewProps {
  years: Year[],
  months: Month[],
  filteredPrices: Price[],
  activatedCats: Categorie[],
  filteredCats: Categorie[],
  isAllYearsChecked: boolean,
  isAllMonthsChecked: boolean,
  isAllCatsChecked: boolean,
  searchOptions: SearchOptions,
  objects: Object[],
  categories: Categorie[],
  modifPriceInput: ModifPriceInput,
  isAddOpen: boolean,
  addPriceInput: AddPriceInput
}

export interface ModifLineProps {
  modifPriceInput: ModifPriceInput,
  objects: Object[],
  filteredCats: Categorie[],
  lastMutatedPriceId: number
}

export interface AddLineProps {
  addPriceInput: AddPriceInput,
  categories: Categorie[],
  isAddOpen: boolean
}

export interface SumLineProps { filteredCats: Categorie[], sumType: SUM_TYPE }
export interface SimpleLineProps { filteredCats: Categorie[], p: Price, index: number, lastMutatedPriceId: number }

export interface TitleAmountMap {
  RECETTE: string,
  DEPENSE: string,
  RESERVE: string
  TOTAL: string
}

export interface FilteredProps {
  filteredPrices: Price[],
  filteredCats: Categorie[],
  modifPriceInput: ModifPriceInput,
  objects: Object[],
  categories: Categorie[],
  lastMutatedPriceId: number,
  isAddOpen: boolean,
  addPriceInput: AddPriceInput,
}

export interface FilteredCatsProps {
  filteredCats: Categorie[]
}
