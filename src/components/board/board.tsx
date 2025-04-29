import React from 'react'
import {
  formatDateFR,
  formatPrice,
  formatPriceWithZero
} from '../../utils/helper'
import { Categorie, ModifPriceInput, Object, Price } from '../../types/common'
import { handleModif } from '../../actions/modif'
import { BoardProps, FilteredProps, SimpleLineProps, SumLineProps, TitleAmountMap } from './boardView.d'
import { ModifLine } from '../modif/modif'

export const Board: React.FC<BoardProps> = ({ filteredPrices, filteredCats, ModifLineProps }) => {
  const { modifPriceInput, objects } = ModifLineProps
  return (
    <table className='boardTable'>
      <HeaderLine filteredCats={filteredCats} />
      <SumLines filteredCats={filteredCats} />
      <BodyLines filteredPrices={filteredPrices} filteredCats={filteredCats} modifPriceInput={modifPriceInput} objects={objects} />

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


const BodyLines: React.FC<FilteredProps> = ({ filteredPrices, filteredCats, modifPriceInput, objects }) => {
  return (
    <tbody>
      {filteredPrices.map((p, index) => {
        return (
          p.id === modifPriceInput.id ?
            <ModifLine key={`ModifLine_${index}`} modifPriceInput={modifPriceInput} objects={objects} filteredCats={filteredCats} />
            :
            <SimpleLine key={`SimpleLine_${index}`} filteredCats={filteredCats} p={p} index={index} />

        )
      })}
    </tbody>
  )
}

const SimpleLine: React.FC<SimpleLineProps> = ({ filteredCats, p, index }) => {

  return <tr key={`tr_SimpleLine_${index}`}>
    <td key={`td_admin_${index}`}>
      <button onClick={() => handleModif(p)}>[M]</button>
    </td>
    <td key={`td_date_${index}`}>{formatDateFR(p.actionDate)}</td>
    <td key={`td_obj_${index}`}>{p.obj.name}</td>
    <td
      key={`td_amount_${index}`}
      className={'moneyCell ' + (p.amount < 0 ? 'negative' : 'positive')}
    >
      {formatPrice(p.amount)}
    </td>
    {filteredCats.map((cat, index) => {
      const price = cat.id === p.cat.id ? p.amount : 0
      return (
        <td
          key={`td_price_by_${cat.id}_${index}`}
          className={'moneyCell ' + (price < 0 ? 'negative' : 'positive')}
        >
          {formatPrice(price)}
        </td>
      )
    })}
    <td key={`td_comment_${index}`}>{p.comment}</td>
    <td key={`td_dateCreate_${index}`}>{formatDateFR(p.dateModif)}</td>
    <td key={`td_dateModif_${index}`}>{formatDateFR(p.dateCreate)}</td>
    <td key={`td_template_${index}`}>{p.template}</td>
  </tr>
}

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
