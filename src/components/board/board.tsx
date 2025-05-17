import React from 'react'
import { BoardProps, HeaderLineProps, BodyLineProps } from './boardView.d'
import { ModifLine } from '../modif/modif'
import { DelLine } from '../del/del'
import { SimpleLine, SumLines } from '../boardLines/boardLines'

export const Board: React.FC<BoardProps> = ({ filteredPrices, selectedCats, modifPriceInput, objects, lastMutatedPriceId, addLineProps, isSearchReserved, view }) => {
  const { isAddOpen, categories, addPriceInput } = addLineProps
  return (
    <table className='boardTable'>
      <HeaderLine selectedCats={selectedCats} view={view} />
      <SumLines selectedCats={selectedCats} isSearchReserved={isSearchReserved} view={view} />
      <BodyLines filteredPrices={filteredPrices} selectedCats={selectedCats} modifPriceInput={modifPriceInput} objects={objects} lastMutatedPriceId={lastMutatedPriceId} isAddOpen={isAddOpen} addPriceInput={addPriceInput} categories={categories} view={view} />
    </table>
  )
}

const HeaderLine: React.FC<HeaderLineProps> = ({ selectedCats, view }) => {
  const { isColAmount, isColCat, isColComment, isColDateCreate, isColDateModif, isColTemplate } = view
  return (
    <thead>
      <tr key='tr_header'>
        <th key='th_admin' className='thAdmin'> ADMIN </th>
        <th key='th_date' className='thActionDate'> DATE<br />ACTION</th>
        <th key='th_obj' className='thObj'> OBJET </th>
        {isColAmount && <th key='th_montant' className='thAmount'>MONTANT</th>}
        {isColCat && selectedCats.map((cat, index) => {
          return <th key={index} className='thCat'>{cat.name}</th>
        })}
        {isColComment && <th key='th_comment' className='thComment'> COMMENTAIRE </th>}
        {isColDateCreate && <th key='th_dateCreate' className='thDateCreate'> DATE<br />CREATE </th>}
        {isColDateModif && <th key='th_dateModif' className='thDateModif'> DATE<br />MODIF </th>}
        {isColTemplate && <th key='th_template' className='thTemplate'> TYPE </th>}
      </tr>
    </thead>
  )
}

const BodyLines: React.FC<BodyLineProps> = ({ filteredPrices, selectedCats, modifPriceInput, objects, lastMutatedPriceId, view }) => {

  return (
    <tbody>
      {filteredPrices.map((p, index) => {
        return (
          p.id === modifPriceInput.id ?
            modifPriceInput.template === 2 ?
              <DelLine key={`DelLine_${index}`} selectedCats={selectedCats} price={p} modifPriceInput={modifPriceInput} />
              :
              <ModifLine key={`ModifLine_${index}`} selectedCats={selectedCats} modifPriceInput={modifPriceInput} objects={objects} lastMutatedPriceId={lastMutatedPriceId} view={view} />
            :
            <SimpleLine key={`SimpleLine_${index}`} selectedCats={selectedCats} p={p} index={index} lastMutatedPriceId={lastMutatedPriceId} view={view} />
        )
      })}
    </tbody>
  )
}


