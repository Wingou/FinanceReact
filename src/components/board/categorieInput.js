import React from 'react'
import {
  handleFilteredCat,
  handleUpdateAllCats,
  handleUpdateMultipleCats
} from '../../actions/search'

export const ActivatedCatsInput = props => {
  const { activatedCats } = props
  return activatedCats.length === 0 ? <MsgNoCat /> : <InputDiv props={props} />
}

const MsgNoCat = () => <div className='MsgNoCatDiv'>Pas de catégorie</div>
const InputDiv = ({ props }) => {
  return (
    <div className='InputDiv'>
      <label key={'multipleCatsLabel'} className='CheckboxLabel HeadLabel'>
        <input
          key={'multipleCatsInput'}
          className='CheckboxInput'
          type='checkbox'
          name='multipleCats'
          checked={props.isMultiCats}
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
          checked={props.isAllCatsChecked}
          onChange={e => {
            handleUpdateAllCats(e)
          }}
        />
        ALL -
      </label>
      {props.activatedCats.map((c, index) => (
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
}
