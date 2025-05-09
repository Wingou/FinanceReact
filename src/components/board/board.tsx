import React from 'react'
import {
  formatDateFR,
  formatPrice,
  formatPriceWithZero
} from '../../utils/helper'
import { Categorie, ModifPriceInput, Object, Price } from '../../types/common'
import { handleModif, handleModifPrice } from '../../actions/modif'
import { BoardProps, SelectedCatsProps, FilteredProps, SimpleLineProps, SumLineProps, TitleAmountMap } from './boardView.d'
import { ModifLine } from '../modif/modif'
import { DelLine } from '../del/del'
import { SimpleLine, SumLines } from '../boardLines/boardLines'


export const Board: React.FC<BoardProps> = ({ filteredPrices, selectedCats, modifLineProps, addLineProps }) => {
  const { modifPriceInput, objects, lastMutatedPriceId } = modifLineProps
  const { isAddOpen, categories, addPriceInput } = addLineProps
  return (
    <table className='boardTable'>
      <HeaderLine selectedCats={selectedCats} />
      <SumLines selectedCats={selectedCats} />
      <BodyLines filteredPrices={filteredPrices} selectedCats={selectedCats} modifPriceInput={modifPriceInput} objects={objects} lastMutatedPriceId={lastMutatedPriceId} isAddOpen={isAddOpen} addPriceInput={addPriceInput} categories={categories} />
    </table>
  )
}


const HeaderLine: React.FC<SelectedCatsProps> = ({ selectedCats }) => {
  return (
    <thead>
      <tr key='tr_header'>
        <th key='th_admin'> ADMIN </th>
        <th key='th_date'> DATE </th>
        <th key='th_obj'> OBJET </th>
        <th key='th_montant'> MONTANT </th>
        {selectedCats.map((cat, index) => {
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



const BodyLines: React.FC<FilteredProps> = ({ filteredPrices, selectedCats, modifPriceInput, objects, lastMutatedPriceId, isAddOpen, addPriceInput, categories }) => {
  return (
    <tbody>

      {filteredPrices.map((p, index) => {
        return (
          p.id === modifPriceInput.id ?
            modifPriceInput.template === 2 ?
              <DelLine key={`DelLine_${index}`} selectedCats={selectedCats} price={p} modifPriceInput={modifPriceInput} />
              :
              <ModifLine key={`ModifLine_${index}`} modifPriceInput={modifPriceInput} objects={objects} selectedCats={selectedCats} lastMutatedPriceId={lastMutatedPriceId} />
            :
            <SimpleLine key={`SimpleLine_${index}`} selectedCats={selectedCats} p={p} index={index} lastMutatedPriceId={lastMutatedPriceId} />
        )
      })}
    </tbody>
  )
}


