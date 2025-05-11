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
import { CheckBox } from '../common/inputForm'

interface DateInputProps {
  years: Year[],
  months: Month[],
  isAllYearsChecked: boolean,
  isAllMonthsChecked: boolean,
  isMultiYears: boolean,
  isMultiMonths: boolean
}

export const DateInput: React.FC<DateInputProps> = ({
  years,
  months,
  isAllYearsChecked,
  isAllMonthsChecked,
  isMultiYears,
  isMultiMonths
}) => (
  <div key='div_dateInput'>
    <div className='searchDiv' >
      <div className='searchCheckboxAdmin'>
        <CheckBox key={'multipleYears'}
          name='multipleYears'
          index={0}
          checked={isMultiYears}
          handleFC={handleUpdateMultipleYears}
          label='MULTI'
          isLabelBold={true}
        />
        <CheckBox key={'allYears'}
          name='allYears'
          index={1}
          checked={isAllYearsChecked}
          handleFC={handleUpdateAllYears}
          label='ALL'
          isLabelBold={true}
        />
      </div>
      <div className='searchCheckboxOptions'>
        {years.map((y, index) => {
          return (
            <CheckBox
              key={`y.name_${index}`}
              name={y.name}
              index={index}
              checked={y.isOn}
              handleFC={handleUpdateYear}
              label={y.year.toString()}
            />
          )
        })}
      </div>
    </div>

    <div key='div_dateInput'>
      <div className='searchDiv' >
        <div className='searchCheckboxAdmin'>
          <CheckBox
            key='multipleMonths'
            name='multipleMonths'
            index={0}
            checked={isMultiMonths}
            handleFC={handleUpdateMultipleMonths}
            label='MULTI'
            isLabelBold={true}
          />
          <CheckBox
            key='allMonths'
            name='allMonths'
            index={1}
            checked={isAllMonthsChecked}
            handleFC={handleUpdateAllMonths}
            label='ALL'
            isLabelBold={true}
          />
        </div>
        <div className='searchCheckboxOptions'>
          {months.map((m, index) => {
            return (
              <CheckBox
                key={`m.name_${index}`}
                name={m.month.toString()}
                index={index}
                checked={m.isOn}
                handleFC={handleUpdateMonth}
                label={m.name}
              />
            )
          })}
        </div>
      </div>
    </div>
  </div>
)
