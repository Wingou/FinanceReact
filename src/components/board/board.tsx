import React from 'react'
import {
  formatDateFR,
  formatPrice,
  formatPriceWithZero
} from '../../utils/helper'
import { Categorie, Price } from '../../types/common'
import { SUM_TYPE } from '../../constants/constants'
import { handleModif } from '../../actions/modif'

interface BoardProps {
  filteredPrices: Price[],
  filteredCats: Categorie[]
}

export const BoardWithoutSum: React.FC<BoardProps> = ({ filteredPrices, filteredCats }) => {
  return (
    <table className='boardTable'>
      <HeaderLine filteredCats={filteredCats} />
      <BodyLines filteredPrices={filteredPrices} filteredCats={filteredCats} />
    </table>
  )
}

export const Board: React.FC<BoardProps> = ({ filteredPrices, filteredCats }) => {
  return (
    <table className='boardTable'>
      <HeaderLine filteredCats={filteredCats} />
      <SumLines filteredCats={filteredCats} />
      <BodyLines filteredPrices={filteredPrices} filteredCats={filteredCats} />
    </table>
  )
}

interface FilteredCatsProps {
  filteredCats: Categorie[]
}

const HeaderLine: React.FC<FilteredCatsProps> = ({ filteredCats }) => {
  return (
    <thead>
      <tr key='tr_header'>
        <th key='th_admin'> ADMIN </th>
        <th key='th_date'> DATE </th>
        <th key='th_obj'> OBJET </th>
        <th key='th_montant'> MONTANT </th>
        {filteredCats.map((cat, index) => {
          return <th key={index}>{cat.name}</th>
        })}
        <th key='th_comment'> COMMENTAIRE </th>
        <th key='th_dateCreate'> DATE CREATE </th>
        <th key='th_dateModif'> DATE MODIF </th>
        <th key='th_template'> TEMPLATE </th>
      </tr>
    </thead>
  )
}

const SumLines: React.FC<FilteredCatsProps> = ({ filteredCats }) => {
  return (
    <tbody className='SumLineTBody'>
      <SumLine filteredCats={filteredCats} sumType='RECETTE' />
      <SumLine filteredCats={filteredCats} sumType='DEPENSE' />
      <SumLine filteredCats={filteredCats} sumType='TOTAL' />
    </tbody>
  )
}

interface FilteredProps { filteredPrices: Price[], filteredCats: Categorie[] }


const BodyLines: React.FC<FilteredProps> = ({ filteredPrices, filteredCats }) => {

  return (
    <tbody>
      {filteredPrices.map((p, index) => {
        return (
          <tr key={index}>
            <td key='td_admin'>
              <button onClick={()=>handleModif(p)}>[M]</button>
              </td>
            <td key='td_date'>{formatDateFR(p.actionDate)}</td>
            <td key='td_obj'>{p.obj.name}</td>
            <td
              key={index}
              className={
                'moneyCell ' + (p.amount < 0 ? 'negative' : 'positive')
              }
            >
              {formatPrice(p.amount)}
            </td>
            {filteredCats.map((cat, index) => {
              const price = cat.id === p.cat.id ? p.amount : 0
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

interface SumLineProps { filteredCats: Categorie[], sumType: SUM_TYPE }

const SumLine: React.FC<SumLineProps> = ({ filteredCats, sumType }) => {

  const amount = filteredCats.reduce((acc, cats) => {
    if (cats.isOn) {
      switch (sumType) {
        case 'RECETTE':
          return acc + cats.recette
        case 'DEPENSE':
          return acc + cats.depense
        case 'TOTAL':
          return acc + cats.recette + cats.depense
        default:
          return acc
      }
    } else {
      return acc
    }
  }, 0)


  interface TitleAmountMap {
    RECETTE: string,
    DEPENSE: string,
    TOTAL: string
  }

  const titleAmount: string =
    ({
      'RECETTE': 'RECETTE',
      'DEPENSE': 'DEPENSE',
      'TOTAL': 'total (R-D)'
    } as TitleAmountMap)[sumType] || ''

  const formatPriceFunc =
    sumType === 'TOTAL' ? formatPriceWithZero : formatPrice
  return (
    <tr key={'tr_' + sumType}>
      <td key={'td_' + sumType} className='SumTitleCell' colSpan={3}>
        {titleAmount}
      </td>
      <td
        key={'td_amont_' + sumType}
        className={'moneyCell ' + (amount < 0 ? 'negative' : 'positive')}
      >
        {formatPriceFunc(amount)}
      </td>
      {filteredCats.map((cat, index) => {
        const price: number =
          {
            'RECETTE': cat.recette,
            'DEPENSE': cat.depense,
            'TOTAL': cat.recette + cat.depense
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
