import React from 'react'
import {
  handleUpdateSearchDel,
  handleUpdateSearchReserved,
  handleUpdateDislayCol
} from '../../actions/search'
import { CheckBox } from '../common/inputForm'
import { DisplayInputProps } from '../board/boardView.d'

export const DisplayInput: React.FC<DisplayInputProps> = ({ isSearchDel, isSearchReserved, view, isPricesFound }) => {
  const { isColAmount, isColComment, isColDateCreate, isColDateModif, isColTemplate } = view
  const disabledDiv = isPricesFound ? '' : 'disabledDiv'
  const disabledDivTitle = isPricesFound ? '' : 'These options are not available when there is no data found'
  return <div className='searchDiv' title={disabledDivTitle}>
    <div className={`searchCheckboxAdmin ${disabledDiv}`}  >
      <CheckBox
        name='isSearchDel'
        index={0}
        checked={isSearchDel}
        handleFC={handleUpdateSearchDel}
        label='DELETED' />
      <CheckBox
        name='isSearchReserved'
        index={0}
        checked={isSearchReserved}
        handleFC={handleUpdateSearchReserved}
        label='RESERVED' />
    </div>
    <div className={`searchCheckboxOptions ${disabledDiv}`}>
      <CheckBox
        name='isColAmount'
        index={0}
        checked={isColAmount}
        handleFC={handleUpdateDislayCol}
        label='MONTANT' />
      <CheckBox
        name='isColComment'
        index={0}
        checked={isColComment}
        handleFC={handleUpdateDislayCol}
        label='COMMENTAIRE' />
      <CheckBox
        name='isColDateCreate'
        index={0}
        checked={isColDateCreate}
        handleFC={handleUpdateDislayCol}
        label='D.CREATE' />
      <CheckBox
        name='isColDateModif'
        index={0}
        checked={isColDateModif}
        handleFC={handleUpdateDislayCol}
        label='D.MODIF' />
      <CheckBox
        name='isColTemplate'
        index={0}
        checked={isColTemplate}
        handleFC={handleUpdateDislayCol}
        label='TYPE' />
    </div>
  </div>
}

