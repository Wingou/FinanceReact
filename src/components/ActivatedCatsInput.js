import React from 'react'

export const ActivatedCatsInput = ({ activatedCats }) => {
  const result = (
    <div>
      activatedCats :
      {activatedCats.map((c, index) => {
        return (
          <label>
            {c} <input type='checkbox' />
          </label>
        )
      })}
    </div>
  )
  return result
}
