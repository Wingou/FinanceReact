import React from 'react'

export const Table = ({ prices, activatedCats }) => {
  console.log ("activatedCats", activatedCats)
  return (
    <table style={{ border: '1px solid black' }}>
      <thead>
        <tr key='0'>
          <th style={{ border: '1px solid black' }}> DATE </th>
          <th style={{ border: '1px solid black' }}> OBJET </th>
          {activatedCats.map(activatedCatName => {
            return (
              <th style={{ border: '1px solid black' }}>{activatedCatName}</th>
            )
          })}

          <th style={{ border: '1px solid black' }}> COMMENTAIRE </th>
        </tr>
      </thead>
      <tbody>
        {prices.map((p, index) => {
          return (
            <tr key={index}>
              <td style={{ border: '1px solid black' }}>{p.actionDate}</td>
              <td style={{ border: '1px solid black' }}>{p.objName}</td>
              {activatedCats.map(activatedCatName => {
                return (
                  <td style={{ border: '1px solid black' }}>
                    {activatedCatName === p.catName ? p.priceValue : ''}
                  </td>
                )
              })}
              <td style={{ border: '1px solid black' }}>{p.comment}</td>
            </tr>
          )
           
        })}
      </tbody>
    </table>
  )
}
