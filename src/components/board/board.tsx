import React, { useContext } from 'react'
import { ModifLine } from '../modif/modif'
import { DelLine } from '../del/del'
import { SimpleLine, SumLines } from '../boardLines/boardLines'
import { BoardViewContext } from '../../containers/boardViewContainer'

export const Board: React.FC = () => {
  return (
    <table className='boardTable'>
      <HeaderLine />
      <SumLines />
      <BodyLines />
    </table>
  )
}

const HeaderLine: React.FC = () => {
  const { view, selectedCats } = useContext(BoardViewContext)
  const { isColDay, isColObj, isColAmount, isColCat, isColComment, isColDateCreate, isColDateModif, isColTemplate } = view
  const isColDateModif_ = isColDateModif && isColObj && isColDay
  const isColDateCreate_ = isColDateCreate && isColObj && isColDay
  return (
    <thead>
      <tr key='tr_header'>
        <th key='th_admin' className='thAdmin'> ADMIN </th>
        <th key='th_date' className='thActionDate'> DATE<br />ACTION</th>
        {isColObj && <th key='th_obj' className='thObj'> OBJET </th>}
        {isColAmount && <th key='th_montant' className='thAmount'>MONTANT</th>}
        {isColCat && selectedCats.map((cat, index) => {
          return <th key={index} className='thCat'>{cat.name}</th>
        })}
        {isColComment && <th key='th_comment' className='thComment'> COMMENTAIRE </th>}
        {isColDateCreate_ && <th key='th_dateCreate' className='thDateCreate'> DATE<br />CREATE </th>}
        {isColDateModif_ && <th key='th_dateModif' className='thDateModif'> DATE<br />MODIF </th>}
        {isColTemplate && <th key='th_template' className='thTemplate'> TYPE </th>}
      </tr>
    </thead>
  )
}

const BodyLines: React.FC = () => {
  const { view, filteredPrices, modifPriceInput } = useContext(BoardViewContext)
  const { isColObj, isColDay, isAddOpen } = view
  return (
    <tbody>
      {filteredPrices.map((p, index) => {
        return (
          p.id === modifPriceInput.id && isColObj && isColDay && !isAddOpen ?
            modifPriceInput.template === 2 ?
              <DelLine key={`DelLine_${index}`} price={p} />
              :
              <ModifLine key={`ModifLine_${index}`} />
            :
            <SimpleLine key={`SimpleLine_${index}`} price={p} index={index} />
        )
      })}
    </tbody>
  )
}