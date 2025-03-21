import React from 'react'
import { handleFilteredCat } from '../actions/search'

export const ActivatedCatsInput = ({ activatedCats }) => {
  return <div className='CategoriesDiv'>
      {activatedCats.map((c, index) => {
        return (
          <label key={index}>
            <input
              className='Checkbox'
              type='checkbox'
              checked={c.filtered}
              name={c.id}
              onChange={e => handleFilteredCat(e)}
            />
            <label className='Checkbox'>{c.catName + ' '}</label>
          </label>
        )
      })}
    </div>

}
