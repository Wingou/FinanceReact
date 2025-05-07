import React from 'react'
import {
  formatDateFR,
  formatPrice,
  formatPriceWithZero
} from '../../utils/helper'
import { Categorie, ModifPriceInput, Object, Price } from '../../types/common'
import { handleModif, handleModifPrice } from '../../actions/modif'
import { BoardProps, FilteredCatsProps, FilteredProps, SimpleLineProps, SumLineProps, TitleAmountMap } from './boardView.d'
import { ModifLine } from '../modif/modif'
import { DelLine } from '../del/del'
import { SimpleLine, SumLines } from './boardLines'

export const Board: React.FC<BoardProps> = ({ filteredPrices, filteredCats, modifLineProps }) => {
  const { modifPriceInput, objects, lastMutatedPriceId } = modifLineProps
  return (
    <table className='boardTable'>
      <HeaderLine filteredCats={filteredCats} />
      <SumLines filteredCats={filteredCats} />
      <BodyLines filteredPrices={filteredPrices} filteredCats={filteredCats} modifPriceInput={modifPriceInput} objects={objects} lastMutatedPriceId={lastMutatedPriceId} />

    </table>
  )
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



const BodyLines: React.FC<FilteredProps> = ({ filteredPrices, filteredCats, modifPriceInput, objects, lastMutatedPriceId }) => {
  return (
    <tbody>
      {filteredPrices.map((p, index) => {
        return (
          p.id === modifPriceInput.id ?
            modifPriceInput.template === 2 ?
              <DelLine key={`DelLine_${index}`} filteredCats={filteredCats} price={p} modifPriceInput={modifPriceInput} />
              :
              <ModifLine key={`ModifLine_${index}`} modifPriceInput={modifPriceInput} objects={objects} filteredCats={filteredCats} lastMutatedPriceId={lastMutatedPriceId} />
            :
            <SimpleLine key={`SimpleLine_${index}`} filteredCats={filteredCats} p={p} index={index} lastMutatedPriceId={lastMutatedPriceId} />
        )
      })}
    </tbody>
  )
}


