import React, { Component } from 'react'
import { Board } from './board'
import { ActivatedCatsInput } from './categorieInput'
import { DateInput } from './datesInput'

export class BoardView extends Component {
  render () {
    const {
      years,
      months,
      filteredPrices,
      activatedCats,
      filteredCats,
      allYearsChecked,
      allMonthsChecked,
      allCatsChecked,
      multipleYearsChecked,
      multipleMonthsChecked,
      multipleCatsChecked
    } = this.props

    return (
      <div>
        <DateInput
          years={years}
          months={months}
          allYearsChecked={allYearsChecked}
          allMonthsChecked={allMonthsChecked}
          multipleYearsChecked={multipleYearsChecked}
          multipleMonthsChecked={multipleMonthsChecked}
        />
        {activatedCats.length !== 0 && (
          <ActivatedCatsInput
            activatedCats={activatedCats}
            allCatsChecked={allCatsChecked}
            multipleCatsChecked={multipleCatsChecked}
          />
        )}
        {filteredPrices.length !== 0 && (
          <Board filteredPrices={filteredPrices} filteredCats={filteredCats} />
        )}
      </div>
    )
  }
}
