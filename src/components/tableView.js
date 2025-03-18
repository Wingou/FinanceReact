import React, { Component } from 'react'
import { DateInput } from './YearInput'
import { Table } from './table'
import { CatsOnInput } from './CatsOnInput'

export class TableView extends Component {
  render () {
    const { catsOn, selectedYear, selectedMonth, prices } = this.props
    return (
      <div>
        <DateInput selectedYear={selectedYear} selectedMonth={selectedMonth} />
        {catsOn && <CatsOnInput catsOn={catsOn} />}
        {prices && <Table prices={prices} />}
      </div>
    )
  }
}
