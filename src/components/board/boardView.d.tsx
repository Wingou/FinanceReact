import { AddPriceInput, Categorie, ModifPriceInput, Month, Object, Price, SearchOptions, Year } from '../../types/common'
import { SUM_TYPE } from '../../constants/constants'

export interface BoardProps {
  filteredPrices: Price[],
  selectedCats: Categorie[],
  modifLineProps: ModifLineProps,
  addLineProps: AddLineProps,
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
  categories: Categorie[],
  modifPriceInput: ModifPriceInput,
  isAddOpen: boolean,
  addPriceInput: AddPriceInput
}

export interface ModifLineProps {
  modifPriceInput: ModifPriceInput,
  objects: Object[],
  selectedCats: Categorie[],
  lastMutatedPriceId: number
}

export interface AddLineProps {
  addPriceInput: AddPriceInput,
  categories: Categorie[],
  isAddOpen: boolean
}

export interface SumLineProps { selectedCats: Categorie[], sumType: SUM_TYPE }
export interface SimpleLineProps { selectedCats: Categorie[], p: Price, index: number, lastMutatedPriceId: number }

export interface TitleAmountMap {
  RECETTE: string,
  DEPENSE: string,
  RESERVE: string
  TOTAL: string
}

export interface FilteredProps {
  filteredPrices: Price[],
  selectedCats: Categorie[],
  modifPriceInput: ModifPriceInput,
  objects: Object[],
  categories: Categorie[],
  lastMutatedPriceId: number,
  isAddOpen: boolean,
  addPriceInput: AddPriceInput,
}

export interface SelectedCatsProps {
  selectedCats: Categorie[]
}



export interface ActivatedCatsInputProps {
  displayedCats: Categorie[]
  isMultiCats: boolean
  isAllCatsChecked: boolean
}

export interface SearchInputCatProps {
  props: ActivatedCatsInputProps
}


export interface InputTextProps {
  name: string,
  placeholder: string,
  handleFC: (e: React.ChangeEvent<HTMLInputElement>) => void,
  value: string,
  width?: string
}


export interface SearchWordInputProps {
  searchWord: string,
  searchMin: number | null,
  searchMax: number | null,
  isSearchDel: boolean,
  isSearchReserved: boolean
}


export interface InputDateProps {
  name: string,
  value: string,
  handleFC: (e: React.ChangeEvent<HTMLInputElement>) => void
}


