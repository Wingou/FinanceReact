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
  const minPrice = searchMin === null ? '' : searchMin.toString()
  const maxPrice = searchMax === null ? '' : searchMax.toString()
  const disabledDiv = isPricesFound ? '' : 'disabledDiv'
  const disabledDivTitle = isPricesFound ? '' : 'These options are not available when there is no data found'
  return <div className='searchDiv' title={disabledDivTitle}>
    <div className={`searchCheckDiv ${disabledDiv}`}  >
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

