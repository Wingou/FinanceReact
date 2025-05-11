import React from 'react'
import {
  handleUpdateSearchWord,
  handleUpdateSearchMin,
  handleUpdateSearchMax,
  handleUpdateSearchDel,
  handleUpdateSearchReserved
} from '../../actions/search'
import { CheckBox, InputPrice, InputText } from '../common/inputForm'
import { SearchWordInputProps } from './boardView.d'
import { handleCancel } from '../../actions/cancel'

export const SearchWordInput: React.FC<SearchWordInputProps> = ({ searchWord, searchMin, searchMax, isSearchDel, isSearchReserved }) => {
  const minPrice = searchMin === null ? '' : searchMin.toString()
  const maxPrice = searchMax === null ? '' : searchMax.toString()
  return <div className='searchDiv' >
    <InputText
      name='search'
      placeholder='Search...'
      handleFC={handleUpdateSearchWord}
      value={searchWord}
      width='w-20'
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
    <div className='searchDiv'>
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
    <div className='addInput_Label'>
      |
    </div>
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
}

