import React, { Component } from 'react'
import { DateInput } from './YearInput'
import { Table } from './table'
import { ActivatedCatsInput } from './catsInput'


export class TableView extends Component {
  render () {
    const { activatedCats, selectedYear, selectedMonth, prices } = this.props
    const filteredCatNames = activatedCats
      .filter(c => c.filtered)
      .map(c => c.catName)
    const filteredPrices = prices.filter(p =>
      filteredCatNames.includes(p.catName)
    )

    return (
      <div>
        <DateInput selectedYear={selectedYear} selectedMonth={selectedMonth} />
        {activatedCats.length !== 0 && (
          <ActivatedCatsInput activatedCats={activatedCats} />
        )}


        {filteredPrices.length !== 0 && (
          <Table  
          prices={filteredPrices}
          catNames={filteredCatNames}
          activatedCats={activatedCats}/>
        )}
      </div>
    )
  }
}
