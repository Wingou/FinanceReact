import React from 'react'
import { formatPrice, formatPriceWithZero } from '../utils/helper'

export const Table = ({ prices, catNames, activatedCats }) => {
  return (
    <table
      className='boardTable'
    >
      <TableHeader props={catNames} />
      <TableTotal props={{ activatedCats, catNames }} />
      <TableBody props={{ prices, catNames }} />
    </table>
  )
}

const TableHeader = ({ props: catNames_ }) => {
  return (
    <thead>
      <tr key='0'>
        <th key='th_date'> DATE </th>
        <th key='th_obj'> OBJET </th>
        <th key='th_montant'> MONTANT </th>
        {catNames_.map((activatedCatName, index) => {
          return <th key={index}>{activatedCatName}</th>
        })}

        <th key='th_comment'> COMMENTAIRE </th>
      </tr>
    </thead>
  )
}

const TableTotal = ({ props }) => {
  const { activatedCats: activatedCats_, catNames: catNames_ } = props
  return (
    <tbody>
      <tr key={'tr_recette'}>
        <td className='SumTitleCell' colSpan={2}>Recette</td>
        <td> </td>
        {catNames_.map(catName => {
          const priceOfCat = activatedCats_.find(
            c => catName === c.catName
          ).recette
          return (
            <td className={'moneyCell ' + (priceOfCat < 0 ? 'negative' : 'positive')}>
              {formatPrice(priceOfCat)}
            </td>
          )
        })}
        <td> </td>
      </tr>
      <tr key={'tr_depense'}>
        <td className='SumTitleCell' colSpan={2}>Dépense</td>
        <td> </td>
        {catNames_.map(catName => {
          const priceOfCat = activatedCats_.find(
            c => catName === c.catName
          ).depense
          return (
            <td className={'moneyCell ' + (priceOfCat < 0 ? 'negative' : 'positive')}>
              {formatPrice(priceOfCat)}
            </td>
          )
        })}
        
        <td> </td>
      </tr>
      <tr key={'tr_total'}>
        <td className='SumTitleCell totalBkgCell' colSpan={2}>Total (D-R)</td>
          {console.log("Activateds :", activatedCats_)}
          
            <td>
                 { activatedCats_.reduce( (acc, cats) => {return acc + cats.total} ,0)}
            </td>
          

        
        
        
        
        
        {catNames_.map(catName => {
          const priceOfCat = activatedCats_.find(
            c => catName === c.catName
          ).total
          return (
            <td className={  'totalBkgCell moneyCell ' + (priceOfCat < 0 ? 'negative' : 'positive')}>
              {formatPriceWithZero(priceOfCat)}
            </td>
          )
        })}
        <td> </td>
      </tr>
    </tbody>
  )
}

const TableBody = ({ props }) => {
  const { prices: prices_, catNames: catNames_ } = props
  return (
    <tbody>
      {prices_.map((p, index) => {
        return (
          <tr key={index}>
            <td key='td_date'>
              {p.actionDate}
            </td>
            <td key='td_obj'>
              {p.objName}
            </td>
            <td> </td>
            {catNames_.map((activatedCatName, index) => {
              const priceOfCat =
                activatedCatName === p.catName ? p.priceValue : 0
              return (
                <td
                  key={index}
                  className={'moneyCell ' + (priceOfCat < 0 ? 'negative' : 'positive')}
                >
                  {formatPrice(priceOfCat)}
                </td>
              )
            })}
            <td key='td_comment'>
              {p.comment}
            </td>
          </tr>
        )
      })}
    </tbody>
  )
}
