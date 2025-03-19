import React, { Component } from 'react'
import { DateInput } from './YearInput'
import { Table } from './table'
import { ActivatedCatsInput } from './ActivatedCatsInput'

export class TableView extends Component {
  render () {
    const { activatedCats, selectedYear, selectedMonth, prices } = this.props
    return (
      <div>
        <DateInput selectedYear={selectedYear} selectedMonth={selectedMonth} />
        {activatedCats && <ActivatedCatsInput activatedCats={activatedCats} />}
        {prices && activatedCats&&<Table prices={prices} activatedCats={activatedCats} />}
      </div>
    )
  }
}
