import React from 'react'

export const Table = ({ prices }) => {
  return (
    <table style={{ border: '1px solid black' }}>
      <thead>
        <tr key='0'>
          <th style={{ border: '1px solid black' }}> DATE </th>
          <th style={{ border: '1px solid black' }}> CATEGORIE </th>
          <th style={{ border: '1px solid black' }}> OBJET </th>
          <th style={{ border: '1px solid black' }}> PRIX </th>
          <th style={{ border: '1px solid black' }}> COMMENTAIRE </th>
        </tr>
      </thead>
      <tbody>
        {prices.map((p, index) => {
          const a = (
            <tr key={index}>
              <td style={{ border: '1px solid black' }}>{p.actionDate}</td>
              <td style={{ border: '1px solid black' }}>{p.catName}</td>
              <td style={{ border: '1px solid black' }}>{p.objName}</td>
              <td style={{ border: '1px solid black' }}>{p.priceValue}</td>
              <td style={{ border: '1px solid black' }}>{p.comment}</td>
            </tr>
          )
          return a
        })}
      </tbody>
    </table>
  )
}
