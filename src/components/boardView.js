import React, { Component } from 'react'
import { Board } from './board'
import { ActivatedCatsInput } from './categorieInput'
import { DateInput } from './dateInput'

export class BoardView extends Component {
  render () {
    const {
      years,
      months,
      filteredPrices,
      activatedCats,
      filteredCats
    } = this.props
    return (
      <div>
        <DateInput years={years} months={months} />
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
