import React from 'react'
import {
  handleFilteredCat,
  handleUpdateAllCats,
  handleUpdateMultipleCats
} from '../../actions/search'

export const ActivatedCatsInput = ({
  activatedCats,
  isAllCatsChecked,
  isMultiCats
}) => (
  <div className='InputDiv'>
    <label key={'multipleCatsLabel'} className='CheckboxLabel HeadLabel'>
      <input
        key={'multipleCatsInput'}
        className='CheckboxInput'
        type='checkbox'
        name='multipleCats'
        checked={isMultiCats}
        onChange={e => {
          handleUpdateMultipleCats(e)
        }}
      />
      MULTI
    </label>
    <label key={'allCatsLabel'} className='CheckboxLabel HeadLabel'>
      <input
        key={'allCatsInput'}
        className='CheckboxInput'
        type='checkbox'
        name='allCats'
        checked={isAllCatsChecked}
        onChange={e => {
          handleUpdateAllCats(e)
        }}
      />
      ALL -
    </label>
    {activatedCats.map((c, index) => (
      <label key={index} className='CheckboxLabel'>
        <input
          className='Checkbox'
          type='checkbox'
          checked={c.filtered}
          name={c.id}
          onChange={e => handleFilteredCat(e)}
        />
        {c.catName + ' '}
      </label>
    ))}
  </div>
)
