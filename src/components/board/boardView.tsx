import React, { Component } from 'react'
import { Board } from './board'
import { ActivatedCatsInput } from './categorieInput'
import { DateInput } from './datesInput'
import { SearchWordInput } from './searchInput'
import { NoBoard } from './noBoard'
import { Categorie, ModifPriceInput, Month, Object, Price, SearchOptions, Year } from '../../types/common'

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

export class BoardView extends Component<BoardViewProps, {}> {
  render() {
    const {
      years,
      months,
      filteredPrices,
      activatedCats,
      filteredCats,
      isAllYearsChecked,
      isAllMonthsChecked,
      isAllCatsChecked,
      searchOptions,
      objects,
      modifPriceInput
    } = this.props
    const {
      isMultiYears,
      isMultiMonths,
      isMultiCats,
      searchWord,
      searchMin,
      searchMax
    } = searchOptions

    const ModifLineProps = { objects, modifPriceInput, filteredCats }
    return (
      <div>
        <DateInput
          years={years}
          months={months}
          isAllYearsChecked={isAllYearsChecked}
          isAllMonthsChecked={isAllMonthsChecked}
          isMultiYears={isMultiYears}
          isMultiMonths={isMultiMonths}
        />

        <ActivatedCatsInput
          activatedCats={activatedCats}
          isAllCatsChecked={isAllCatsChecked}
          isMultiCats={isMultiCats}
        />

        <SearchWordInput
          searchWord={searchWord}
          searchMin={searchMin}
          searchMax={searchMax}
        />
        {filteredPrices.length !== 0 ? (
          <Board filteredPrices={filteredPrices} filteredCats={filteredCats} ModifLineProps={ModifLineProps} />
        ) : (
          <NoBoard />
        )}
      </div>
    )
  }
}
