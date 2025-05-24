import React from 'react'
import {
    handleUpdateDislayCol,
    handleUpdateSearchDel,
    handleUpdateSearchReserved
} from '../../actions/search'
import { CheckBox } from '../common/inputForm'
import { GroupByInputProps } from '../board/boardView.d'

export const GroupByInput: React.FC<GroupByInputProps> = ({ isSearchDeleted, isSearchReserved, view, isPricesFound }) => {
    const { isColObj, isColDay, isColMonth, isColAmount, isColCat, isColComment, isColDateCreate, isColDateModif, isColTemplate } = view
    const disabledDiv = isPricesFound ? '' : 'disabledDiv'

    const disabledDivTitle = isPricesFound ? '' : 'These options are not available when there is no data found'
    return <div className='searchDiv' title={disabledDivTitle}>
        <div className={`searchCheckboxAdmin ${disabledDiv}`}>
            <div className={`searchCheckboxLabel`} >
                Lines
            </div>
        </div>
        <div className={`searchCheckboxOptions ${disabledDiv}`}>
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
    </div>
}

