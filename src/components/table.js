import React from 'react'
import { formatPrice, withCurrency } from '../utils/helper'

export const Table = ({ prices, catNames }) => {
  return (
    <table
      style={{
        border: '1px solid black',
        margin: '2px',
        borderSpacing: '0px',
        fontFamily: 'verdana',
        fontSize: '12px'
      }}
    >
      <thead>
        <tr key='0'>
          <th key='th_date' style={{ border: '1px solid black' }}>
            {' '}
            DATE{' '}
          </th>
          <th key='th_obj' style={{ border: '1px solid black' }}>
            {' '}
            OBJET{' '}
          </th>
          {catNames.map((activatedCatName, index) => {
            return (
              <th key={index} style={{ border: '1px solid black' }}>
                {activatedCatName}
              </th>
            )
          })}

          <th key='th_comment' style={{ border: '1px solid black' }}>
            {' '}
            COMMENTAIRE{' '}
          </th>
        </tr>
      </thead>
      <tbody>
        {prices.map((p, index) => {
          return (
            <tr key={index}>
              <td key='td_date' style={{ border: '1px solid black' }}>
                {p.actionDate}
              </td>
              <td key='td_obj' style={{ border: '1px solid black' }}>
                {p.objName}
              </td>
              {catNames.map((activatedCatName, index) => {
                return (
                  <td
                    key={index}
                    style={{
                      border: '1px solid black',
                      textAlign: 'right',
                      paddingRight: '5px'
                    }}
                  >
                    {activatedCatName === p.catName
                      ? formatPrice(p.priceValue)
                      : ''}
                  </td>
                )
              })}
              <td key='td_comment' style={{ border: '1px solid black' }}>
                {p.comment}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
