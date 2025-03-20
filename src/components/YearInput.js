import React from 'react'
import { handleUpdateYear, handleUpdateMonth } from '../actions/search'

export const DateInput = ({ selectedYear, selectedMonth }) => {
  const result = (
    <div  style={{
            fontFamily: 'verdana',
            fontSize: '10px'
          }}>
      Year :{' '}
      <input  style={{
              fontFamily: 'verdana',
              fontSize: '10px'
            }}
        name='selectedYear'
        defaultValue={selectedYear}
        onChange={e => {
          handleUpdateYear(e)
        }}
      />
      {' - '}
      Month :{' '}
      <input  style={{
              fontFamily: 'verdana',
              fontSize: '10px'
            }}
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
