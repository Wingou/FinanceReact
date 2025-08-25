import React, { useContext } from 'react'
import {
  handleUpdateSearchWord,
  handleUpdateSearchMin,
  handleUpdateSearchMax
} from '../../actions/search'
import { InputPrice, InputText } from '../common/inputForm'
import { handleCancel } from '../../actions/cancel'
import { BoardViewContext } from '../../containers/boardViewContainer'

export const SearchWordInput: React.FC<{ isPricesFound: boolean }> = ({ isPricesFound }) => {
  const { searchOptions } = useContext(BoardViewContext)
  const { searchWord, searchMin, searchMax } = searchOptions
  const minPrice: string = searchMin?.toString() ?? ''
  const maxPrice: string = searchMax?.toString() ?? ''
  const disabledDivTitle: string = isPricesFound ? '' : 'These options are not available when there is no data found'
  return <div className='searchDiv' title={disabledDivTitle}>
    <div className={`searchCheckDiv`}  >
      <InputText
        name='search'
        placeholder='Search...'
        handleFC={handleUpdateSearchWord}
        value={searchWord}
        width='w-60'
      />
      <InputPrice
        name='searchMin'
        placeholder='MIN Price'
        handleFC={handleUpdateSearchMin}
        value={minPrice}
      />
      <InputPrice
        name='searchMax'
        placeholder='MAX Price'
        handleFC={handleUpdateSearchMax}
        value={maxPrice}
      />
      <div  >
        <button
          className={`btnAdmin btnAdminSize3 btnEnabled `}
          onClick={() => {
            handleCancel('SEARCH')
          }}
          title='Cliquer pour réinitaliser les valeurs'
        >
          ¤
        </button>
      </div>
    </div>
  </div>
}

