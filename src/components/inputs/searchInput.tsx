import React from 'react'
import {
  handleUpdateSearchWord,
  handleUpdateSearchMin,
  handleUpdateSearchMax
} from '../../actions/search'
import { InputPrice, InputText } from '../common/inputForm'
import { SearchWordInputProps } from '../board/boardView.d'
import { handleCancel } from '../../actions/cancel'

export const SearchWordInput: React.FC<SearchWordInputProps> = ({ searchWord, searchMin, searchMax, isPricesFound }) => {
  const minPrice = searchMin?.toString() ?? ''
  const maxPrice = searchMax?.toString() ?? ''
  const disabledDivTitle = isPricesFound ? '' : 'These options are not available when there is no data found'
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
        value={minPrice as string}
      />
      <InputPrice
        name='searchMax'
        placeholder='MAX Price'
        handleFC={handleUpdateSearchMax}
        value={maxPrice as string}
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

