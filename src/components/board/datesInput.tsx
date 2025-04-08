import React from 'react'
import {
  handleUpdateYear,
  handleUpdateMonth,
  handleUpdateAllYears,
  handleUpdateAllMonths,
  handleUpdateMultipleYears,
  handleUpdateMultipleMonths
} from '../../actions/search'
import { Month, Year } from '../../types/common'



interface DateInputProps {
  years:Year[],
  months:Month[],
  isAllYearsChecked: boolean,
  isAllMonthsChecked: boolean,
  isMultiYears: boolean,
  isMultiMonths: boolean
}

export const DateInput :React.FC<DateInputProps>= ({
  years,
  months,
  isAllYearsChecked,
  isAllMonthsChecked,
  isMultiYears,
  isMultiMonths
}) => (
  <div key='div_dateInput'>
    <div className='InputDiv'>
      <label key={'multipleYearsLabel'} className='CheckboxLabel HeadLabel'>
        <input
          key={'multipleYearsInput'}
          className='CheckboxInput'
          type='checkbox'
          name='multipleYears'
          checked={isMultiYears}
          onChange={(e : React.ChangeEvent<HTMLInputElement>)=> {
            handleUpdateMultipleYears(e)
          }}
        />
        MULTI
      </label>
      <label key={'allYearsLabel'} className='CheckboxLabel HeadLabel'>
        <input
          key={'allYearsInput'}
          className='CheckboxInput'
          type='checkbox'
          name='allYears'
          checked={isAllYearsChecked}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                handleUpdateYear(e)
              }}
            />
            {y.year}
          </label>
        )
      })}
    </div>
    <div className='InputDiv'>
      <label key={'multipleMonthsLabel'} className='CheckboxLabel HeadLabel'>
        <input
          key={'multipleMonthsInput'}
          className='CheckboxInput'
          type='checkbox'
          name='multipleMonths'
          checked={isMultiMonths}
          onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
            handleUpdateMultipleMonths(e)
          }}
        />
        MULTI
      </label>
      <label key={'allMonthsLabel'} className='CheckboxLabel HeadLabel'>
        <input
          key={'allMonthsInput'}
          className='CheckboxInput'
          type='checkbox'
          name='allMonths'
          checked={isAllMonthsChecked}
          onChange={(e : React.ChangeEvent<HTMLInputElement> )=> {
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
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
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
