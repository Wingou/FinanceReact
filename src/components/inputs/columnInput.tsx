import React from 'react'
import {
  handleUpdateSearchDel,
  handleUpdateSearchReserved,
  handleUpdateDislayCol
} from '../../actions/search'
import { CheckBox } from '../common/inputForm'
import { ColumnInputProps } from '../board/boardView.d'

export const ColumnInput: React.FC<ColumnInputProps> = ({ view, isPricesFound }) => {
  const { isColDay, isColMonth, isColObj, isColAmount, isColCat, isColComment, isColDateCreate, isColDateModif, isColTemplate } = view
  const disabledDiv = isPricesFound ? '' : 'disabledDiv'

  const disabledDivTitle = isPricesFound ? '' : 'These options are not available when there is no data found'
  return <div className='searchDiv' title={disabledDivTitle}>
    <div className={`searchCheckboxAdmin ${disabledDiv}`}  >
      <div className={`searchCheckboxLabel`} >
        COLUMNS
      </div>
    </div>
    <div className={`searchCheckboxOptions ${disabledDiv}`}>
      <CheckBox
        name='isColDay'
        index={0}
        checked={isColDay}
        handleFC={handleUpdateDislayCol}
        label='DAY' />
      <CheckBox
        name='isColMonth'
        index={0}
        checked={isColMonth}
        handleFC={handleUpdateDislayCol}
        label='MONTH' />
      <CheckBox
        name='isColObj'
        index={0}
        checked={isColObj}
        handleFC={handleUpdateDislayCol}
        label='OBJET' />
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
  </div>
}

