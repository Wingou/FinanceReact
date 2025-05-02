import React, { Component } from 'react'
import { Board } from './board'
import { ActivatedCatsInput } from './categorieInput'
import { DateInput } from './datesInput'
import { SearchWordInput } from './searchInput'
import { NoBoard } from './noBoard'
import { Categorie, ModifPriceInput, Month, Object, Price, SearchOptions, Year } from '../../types/common'
import { BoardViewProps } from './boardView.d'

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
      searchMax,
      lastMutatedPriceId
    } = searchOptions

    const modifLineProps = {
      objects,
      modifPriceInput,
      filteredCats,
      lastMutatedPriceId
    }
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
          <Board filteredPrices={filteredPrices} filteredCats={filteredCats} modifLineProps={modifLineProps} />
        ) : (
          <NoBoard />
        )}
      </div>
    )
  }
}
