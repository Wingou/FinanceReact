import React from 'react'
import {
  handleUpdateSearchWord,
  handleUpdateSearchMin,
  handleUpdateSearchMax
} from '../actions/search'

export const SearchWordInput = ({ search, searchMin, searchMax }) => (
  <div key='div_searchInput'>
    <div className='InputDiv'>
      <label key={'searchLabel'} className='InputLabel'>
      SEARCH
        <input
          key={'searchInput'}
          className='TextInput'
          type='text'
          name='search'
          defaultValue={search}
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
          defaultValue={searchMin}
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
          defaultValue={searchMax}
          onChange={e => {
            handleUpdateSearchMax(e)
          }}
        />
      </label>
    </div>
  </div>
)
