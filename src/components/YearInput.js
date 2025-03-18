import React from 'react'
import { handleUpdateYear, handleUpdateMonth } from '../actions/search'

export const DateInput = ({ selectedYear, selectedMonth }) => {
  const result = (
    <div>
      Year :{' '}
      <input
        name='selectedYear'
        defaultValue={selectedYear}
        onChange={e => {
          handleUpdateYear(e)
        }}
      />
      Month :{' '}
      <input
        name='selectedMonth'
        defaultValue={selectedMonth}
        onChange={e => {
          handleUpdateMonth(e)
        }}
      />
    </div>
  )
  return result
}
