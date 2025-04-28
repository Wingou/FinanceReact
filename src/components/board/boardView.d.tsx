import { Categorie, ModifPriceInput, Month, Object, Price, SearchOptions, Year } from '../../types/common'
import { SUM_TYPE } from '../../constants/constants'

export interface BoardProps {
  filteredPrices: Price[],
  filteredCats: Categorie[],
  modifViewProps: ModifViewProps
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
  modifPriceInput: ModifPriceInput
}

export interface ModifViewProps {
  modifPriceInput: ModifPriceInput,
  objects: Object[],
  filteredCats: Categorie[]
}

export interface SumLineProps { filteredCats: Categorie[], sumType: SUM_TYPE }
export interface SimpleLineProps { filteredCats: Categorie[], p: Price, index: number }


export interface TitleAmountMap {
  RECETTE: string,
  DEPENSE: string,
  TOTAL: string
}
