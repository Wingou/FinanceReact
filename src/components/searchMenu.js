import React, { Component } from 'react'
// import Button from './affButton';
import { handlePriceId } from '../actions/search'

export class SearchMenu extends Component {
  render () {
    // const selectedPriceId = this.props.selectedPriceId;
    // const selectedBeginDate = this.props.selectedPrice.beginDate;
    // const selectedEndDate = this.props.selectedPrice.endDate;

    return (
      <div>
        {/* { selectedPriceId } */}
        {/* <PriceIdInput props={selectedPriceId} onChange={(e) => { handlePriceId(e); }}/> */}
        <MonthInput selectedMonth={this.props.selectedMonth} />
        <YearInput selectedYear={this.props.selectedYear} />

        <PricesView prices={this.props.prices} />

        {/* <Button affText="Valider" onClick={() => {          }} />  */}
      </div>
    )
  }
}

const PricesView = ({ prices }) => {
  return (
    <table style={{ border: '1px solid black' }}>
      <tr key='0'>
        <th style={{ border: '1px solid black' }}> ID </th>
        <th style={{ border: '1px solid black' }}> DATE </th>
        <th style={{ border: '1px solid black' }}> CATEGORIE </th>
        <th style={{ border: '1px solid black' }}> OBJET </th>
        <th style={{ border: '1px solid black' }}> PRIX </th>
        <th style={{ border: '1px solid black' }}> TEMPLATE </th>
      </tr>

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
    </table>
  )
}

const MonthInput = ({ selectedMonth }) => {
  console.log('this.props.selectedMonth--- : ', selectedMonth)
  const result = (
    <div>
      Month : <input name='selectedMonth' defaultValue={selectedMonth} />
    </div>
  )

  return result
}

const YearInput = ({ selectedYear }) => (
  <div>
    Year : <input name='selectedYear' defaultValue={selectedYear} />
  </div>
)
