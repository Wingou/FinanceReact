import React, { Component } from 'react'
import { DateInput } from './YearInput'
import { Board } from './board'
import { ActivatedCatsInput } from './catsInput'

export class BoardView extends Component {
  render () {
    const {
      selectedYear,
      selectedMonth,
      filteredPrices,
      activatedCats,
      filteredCats
    } = this.props
    return (
      <div>
        <DateInput selectedYear={selectedYear} selectedMonth={selectedMonth} />
        {activatedCats.length !== 0 && (
          <ActivatedCatsInput activatedCats={activatedCats} />
        )}
        {filteredPrices.length !== 0 && (
          <Board filteredPrices={filteredPrices} filteredCats={filteredCats} />
        )}
      </div>
    )
  }
}
