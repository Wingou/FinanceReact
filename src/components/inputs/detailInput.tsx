import React from 'react'
import {
    handleUpdateSearchDel,
    handleUpdateSearchReserved,
    handleUpdateDislayCol
} from '../../actions/search'
import { CheckBox } from '../common/inputForm'
import { ColumnInputProps, GroupByInputProps } from '../board/boardView.d'

export const GroupByInput: React.FC<GroupByInputProps> = ({ isSearchDeleted, isSearchReserved, view, isPricesFound }) => {
    const { isDetailObj, isDetailDay, isColAmount, isColCat, isColComment, isColDateCreate, isColDateModif, isColTemplate } = view
    const disabledDiv = isPricesFound ? '' : 'disabledDiv'

    const disabledDivTitle = isPricesFound ? '' : 'These options are not available when there is no data found'
    return <div className='searchDiv' title={disabledDivTitle}>
        <div className={`searchCheckboxOptions ${disabledDiv}`}>
            <CheckBox
                name='isDetailObj'
                index={0}
                checked={isDetailObj}
                handleFC={handleUpdateDislayCol}
                label='OBJET' />
            <CheckBox
                name='isDetailDay'
                index={0}
                checked={isDetailDay}
                handleFC={handleUpdateDislayCol}
                label='DAY' />
        </div>
    </div>
}

