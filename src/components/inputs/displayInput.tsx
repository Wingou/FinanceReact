import React from 'react'
import {
  handleUpdateSearchDel,
  handleUpdateSearchReserved,
  handleUpdateDislayCol
} from '../../actions/search'
import { CheckBox } from '../common/inputForm'
import { DisplayInputProps } from '../board/boardView.d'

export const DisplayInput: React.FC<DisplayInputProps> = ({ isSearchDeleted, isSearchReserved, view, isPricesFound }) => {
  const { isColObj, isColAmount, isColCat, isColComment, isColDateCreate, isColDateModif, isColTemplate } = view
  const disabledDiv = isPricesFound ? '' : 'disabledDiv'

  const disabledDivTitle = isPricesFound ? '' : 'These options are not available when there is no data found'
  return <div className='searchDiv' title={disabledDivTitle}>
    <div className={`searchCheckboxAdmin ${disabledDiv}`}  >
      <CheckBox
        name='isSearchDeleted'
        index={0}
        checked={isSearchDeleted}
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
        name='isColCat'
        index={0}
        checked={isColCat}
        handleFC={handleUpdateDislayCol}
        label='CATEGORIES' />
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
        label='D.CREATE'
        isDisabled={!isColObj} />
      <CheckBox
        name='isColDateModif'
        index={0}
        checked={isColDateModif}
        handleFC={handleUpdateDislayCol}
        label='D.MODIF'
        isDisabled={!isColObj} />
      <CheckBox
        name='isColTemplate'
        index={0}
        checked={isColTemplate}
        handleFC={handleUpdateDislayCol}
        label='TYPE' />
    </div>
    <div className={`searchCheckboxOptions ${disabledDiv}`}>
      <CheckBox
        name='isColObj'
        index={0}
        checked={isColObj}
        handleFC={handleUpdateDislayCol}
        label='OBJET' />
    </div>
  </div>
}

