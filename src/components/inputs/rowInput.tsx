import React, { useContext } from 'react'
import {
    handleUpdateSearchDel,
    handleUpdateSearchReserved
} from '../../actions/search'
import { CheckBox } from '../common/inputForm'
import { BoardViewContext } from '../../containers/boardViewContainer'

export const GroupByInput: React.FC<{ isPricesFound: boolean }> = ({ isPricesFound }) => {
    const { searchOptions } = useContext(BoardViewContext)
    const { isSearchDeleted, isSearchReserved } = searchOptions
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

