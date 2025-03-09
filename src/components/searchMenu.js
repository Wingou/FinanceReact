import React, { Component } from 'react'
import { handleUpdateYear, handleUpdateMonth } from '../actions/search'

export class SearchMenu extends Component {
  render () {
    return (
      <div>
        <DateInput searchDate={this.props} />
        <PricesView prices={this.props.prices} />
      </div>
    )
  }
}

const PricesView = ({ prices }) => {
  return (
    <table style={{ border: '1px solid black' }}>
      <thead>
        <tr key='0'>
          <th style={{ border: '1px solid black' }}> ID </th>
          <th style={{ border: '1px solid black' }}> DATE </th>
          <th style={{ border: '1px solid black' }}> CATEGORIE </th>
          <th style={{ border: '1px solid black' }}> OBJET </th>
          <th style={{ border: '1px solid black' }}> PRIX </th>
          <th style={{ border: '1px solid black' }}> TEMPLATE </th>
        </tr>
      </thead>
      <tbody>
        {prices.map((p, index) => (
          <tr key={index}>
            <td style={{ border: '1px solid black' }}>{p.id}</td>
            <td style={{ border: '1px solid black' }}>{p.dateAction}</td>
            <td style={{ border: '1px solid black' }}></td>
            <td style={{ border: '1px solid black' }}>{p.id_Objet}</td>
            <td style={{ border: '1px solid black' }}>{p.prix}</td>
            <td style={{ border: '1px solid black' }}>{p.template}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const DateInput = ({ searchDate }) => {
  const result = (
    <div>
      Year :{' '}
      <input
        name='selectedYear'
        defaultValue={searchDate.selectedYear}
        onChange={e => {
          handleUpdateYear(e)
        }}
      />
      Month :{' '}
      <input
        name='selectedMonth'
        defaultValue={searchDate.selectedMonth}
        onChange={e => {
          handleUpdateMonth(e)
        }}
      />
    </div>
  )
  return result
}
