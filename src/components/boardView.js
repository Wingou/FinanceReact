import React, { Component } from 'react'
import { Board } from './board'
import { ActivatedCatsInput } from './categorieInput'
import { DateInput } from './datesInput'
import { SearchWordInput } from './searchInput'
import { NoBoard } from './noBoard'

export class BoardView extends Component {
  render () {
    const {
      years,
      months,
      filteredPrices,
      activatedCats,
      filteredCats,
      isAllYearsChecked,
      isAllMonthsChecked,
      isAllCatsChecked,
      filterOptions
    } = this.props
    const {
      isMultipleYears,
      isMultipleMonths,
      isMultipleCats,
      searchWord,
      searchMin,
      searchMax
    } = filterOptions
    return (
      <div>
        <DateInput
          years={years}
          months={months}
          isAllYearsChecked={isAllYearsChecked}
          isAllMonthsChecked={isAllMonthsChecked}
          isMultipleYears={isMultipleYears}
          isMultipleMonths={isMultipleMonths}
        />
        {activatedCats.length !== 0 && (
          <ActivatedCatsInput
            activatedCats={activatedCats}
            isAllCatsChecked={isAllCatsChecked}
            isMultipleCats={isMultipleCats}
          />
        )}
        <SearchWordInput
          searchWord={searchWord}
          searchMin={searchMin}
          searchMax={searchMax}
        />
        {filteredPrices.length !== 0 ? (
          <Board filteredPrices={filteredPrices} filteredCats={filteredCats} />
        ) : (
          <NoBoard />
        )}
      </div>
    )
  }
}
