import React from 'react'
import { handleFilteredCat } from '../actions/search'

export const ActivatedCatsInput = ({ activatedCats }) => {
  const result = (
    <div
      style={{
        border: '1px solid black',
        margin: '2px',
        borderSpacing: '0px',
        fontFamily: 'verdana',
        fontSize: '12px'
      }}
    >
      {activatedCats.map((c, index) => {
        return (
          <label key={index}>
            <input
              style={{ verticalAlign: 'middle' }}
              type='checkbox'
              checked={c.filtered}
              name={c.catId}
              onChange={e => handleFilteredCat(e)}
            />
            <label style={{ verticalAlign: 'middle' }}>{c.catName + ' '}</label>
          </label>
        )
      })}
    </div>
  )
  return result
}
