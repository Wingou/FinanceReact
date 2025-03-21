import React from 'react'
import { handleUpdateYear, handleUpdateMonth } from '../actions/search'

export const DateInput = ({ selectedYear, selectedMonth }) => {
  const result = (
    <div className='DateInput'>
      {'YEAR '}
      <input
        className='DateInput'
        name='selectedYear'
        defaultValue={selectedYear}
        onChange={e => {
          handleUpdateYear(e)
        }}
      />
      {' MONTH '}
      <input
        className='DateInput'
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
