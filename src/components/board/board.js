import React from 'react'
import {
  formatDateFR,
  formatPrice,
  formatPriceWithZero
} from '../../utils/helper'

export const BoardWithoutSum = ({ filteredPrices, filteredCats }) => {
  return (
    <table className='boardTable'>
      <HeaderLine props={filteredCats} />
      <BodyLines props={{ filteredPrices, filteredCats }} />
    </table>
  )
}

export const Board = ({ filteredPrices, filteredCats }) => {
  return (
    <table className='boardTable'>
      <HeaderLine props={filteredCats} />
      <SumLines props={filteredCats} />
      <BodyLines props={{ filteredPrices, filteredCats }} />
    </table>
  )
}

const HeaderLine = ({ props: filteredCats }) => {
  return (
    <thead>
      <tr key='tr_header'>
        <th key='th_date'> DATE </th>
        <th key='th_obj'> OBJET </th>
        <th key='th_montant'> MONTANT </th>
        {filteredCats.map((cat, index) => {
          return <th key={index}>{cat.catName}</th>
        })}
        <th key='th_comment'> COMMENTAIRE </th>
        <th key='th_dateCreate'> DATE CREATE </th>
        <th key='th_dateModif'> DATE MODIF </th>
        <th key='th_template'> TEMPLATE </th>
      </tr>
    </thead>
  )
}

const SumLines = ({ props: filteredCats }) => {
  return (
    <tbody className='SumLineTBody'>
      <SumLine props={{ filteredCats, sumType: 'recette' }} />
      <SumLine props={{ filteredCats, sumType: 'depense' }} />
      <SumLine props={{ filteredCats, sumType: 'total' }} />
    </tbody>
  )
}

const BodyLines = ({ props }) => {
  const { filteredPrices, filteredCats } = props
  return (
    <tbody>
      {filteredPrices.map((p, index) => {
        return (
          <tr key={index}>
            <td key='td_date'>{formatDateFR(p.actionDate)}</td>
            <td key='td_obj'>{p.objName}</td>
            <td
              key={index}
              className={
                'moneyCell ' + (p.priceValue < 0 ? 'negative' : 'positive')
              }
            >
              {formatPrice(p.priceValue)}
            </td>
            {filteredCats.map((cat, index) => {
              const price = cat.id === p.catId ? p.priceValue : 0
              return (
                <td
                  key={index}
                  className={
                    'moneyCell ' + (price < 0 ? 'negative' : 'positive')
                  }
                >
                  {formatPrice(price)}
                </td>
              )
            })}
            <td key='td_comment'>{p.comment}</td>
            <td key='td_dateCreate'>{formatDateFR(p.dateModif)}</td>
            <td key='td_dateModif'>{formatDateFR(p.dateCreate)}</td>
            <td key='td_template'>{p.template}</td>
          </tr>
        )
      })}
    </tbody>
  )
}

const SumLine = ({ props }) => {
  const { filteredCats, sumType } = props
  const amount = filteredCats.reduce((acc, cats) => {
    if (cats.filtered) {
      switch (sumType) {
        case 'recette':
          return acc + cats.recette
        case 'depense':
          return acc + cats.depense
        case 'total':
          return acc + cats.recette + cats.depense
        default:
          return acc
      }
    } else {
      return acc
    }
  }, 0)

  const titleAmount =
    {
      recette: 'recette',
      depense: 'depense',
      total: 'total (R-D)'
    }[sumType] || 0
  const formatPriceFunc =
    sumType === 'total' ? formatPriceWithZero : formatPrice
  return (
    <tr key={'tr_' + sumType}>
      <td key={'td_' + sumType} className='SumTitleCell' colSpan={2}>
        {titleAmount}
      </td>
      <td
        key={'td_amont_' + sumType}
        className={'moneyCell ' + (amount < 0 ? 'negative' : 'positive')}
      >
        {formatPriceFunc(amount)}
      </td>
      {filteredCats.map((cat, index) => {
        const price =
          {
            recette: cat.recette,
            depense: cat.depense,
            total: cat.recette + cat.depense
          }[sumType] || 0
        return (
          <td
            key={'td_price_' + sumType + index}
            className={'moneyCell ' + (price < 0 ? 'negative' : 'positive')}
          >
            {formatPriceFunc(price)}
          </td>
        )
      })}
      <td key={'td_comment_' + sumType}> </td>
      <td key={'td_dateCreate_' + sumType}> </td>
      <td key={'td_dateModif_' + sumType}> </td>
      <td key={'td_template_' + sumType}> </td>
    </tr>
  )
}
