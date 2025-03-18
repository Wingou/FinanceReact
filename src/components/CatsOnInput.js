import React from 'react'

export const CatsOnInput = ({ catsOn }) => {
  const result = (
    <div>
      CatsOn :
      {catsOn.map((c, index) => {
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
