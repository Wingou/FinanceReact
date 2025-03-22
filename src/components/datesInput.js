import React from 'react'
import {
  handleUpdateYear,
  handleUpdateMonth,
  handleUpdateAllYears,
  handleUpdateAllMonths,
  handleUpdateMultipleYears,
  handleUpdateMultipleMonths
} from '../actions/search'

export const DateInput = ({
  years,
  months,
  allYearsChecked,
  allMonthsChecked,
  multipleYearsChecked,
  multipleMonthsChecked
}) => (
  <div key='div_dateInput'>
    <div className='CheckboxDiv'>
      <label key={'multipleYearsLabel'} className='CheckboxLabel'>
        <input
          key={'multipleYearsInput'}
          className='CheckboxInput'
          type='checkbox'
          name='multipleYears'
          checked={multipleYearsChecked}
          onChange={e => {
            handleUpdateMultipleYears(e)
          }}
        />
        MULTI -
      </label>

      <label key={'allYearsLabel'} className='CheckboxLabel'>
        <input
          key={'allYearsInput'}
          className='CheckboxInput'
          type='checkbox'
          name='allYears'
          checked={allYearsChecked}
          onChange={e => {
            handleUpdateAllYears(e)
          }}
        />
        ALL -
      </label>

      {years.map((y, index) => {
        return (
          <label key={'yearLabel_' + index} className='CheckboxLabel'>
            <input
              key={'yearInput_' + index}
              className='CheckboxInput'
              type='checkbox'
              name={y.year}
              checked={y.filtered}
              onChange={e => {
                handleUpdateYear(e)
              }}
            />
            {y.year}
          </label>
        )
      })}
    </div>
    <div className='CheckboxDiv'>
      <label key={'multipleMonthsLabel'} className='CheckboxLabel'>
        <input
          key={'multipleMonthsInput'}
          className='CheckboxInput'
          type='checkbox'
          name='multipleMonths'
          checked={multipleMonthsChecked}
          onChange={e => {
            handleUpdateMultipleMonths(e)
          }}
        />
        MULTI -
      </label>

      <label key={'allMonthsLabel'} className='CheckboxLabel'>
        <input
          key={'allMonthsInput'}
          className='CheckboxInput'
          type='checkbox'
          name='allMonths'
          checked={allMonthsChecked}
          onChange={e => {
            handleUpdateAllMonths(e)
          }}
        />
        ALL -
      </label>

      {months.map((m, index) => {
        return (
          <label key={'monthLabel_' + index} className='CheckboxLabel'>
            <input
              key={'monthInput_' + index}
              className='CheckboxInput'
              type='checkbox'
              name={m.month}
              checked={m.filtered}
              onChange={e => {
                handleUpdateMonth(e)
              }}
            />
            {m.name}
          </label>
        )
      })}
    </div>
  </div>
)
