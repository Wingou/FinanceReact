import React from 'react'
import {
  handleUpdateSearchWord,
  handleUpdateSearchMin,
  handleUpdateSearchMax
} from '../../actions/search'


interface SearchWordInputProps {
  searchWord:string,
   searchMin:number|null, 
   searchMax:number|null
}

export const SearchWordInput:React.FC<SearchWordInputProps> = ({ searchWord, searchMin, searchMax }) => (
  <div key='div_searchInput'>
    <div className='InputDiv'>
      <label key={'searchLabel'} className='InputLabel'>
      SEARCH
        <input
          key={'searchInput'}
          className='TextInput'
          type='text'
          name='search'
          defaultValue={searchWord}
          onChange={e => {
            handleUpdateSearchWord(e)
          }}
        />
      </label>
      <label key={'searchMinLabel'} className='InputLabel'>- MIN
        <input
          key={'searchMinInput'}
          className='NumberInput'
          type='text'
          name='searchMin'
          defaultValue={searchMin===null? '':searchMin.toString() }
          onChange={e => {
            handleUpdateSearchMin(e)
          }}
        />
      </label>
      <label key={'searchMaxLabel'} className='InputLabel'>
      MAX
        <input
          key={'searchMaxInput'}
          className='NumberInput'
          type='text'
          name='searchMax'
          defaultValue={searchMax===null? '':searchMax.toString() }
          onChange={e => {
            handleUpdateSearchMax(e)
          }}
        />
      </label>
    </div>
  </div>
)
