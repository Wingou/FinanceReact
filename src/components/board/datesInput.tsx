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
        <CheckBox name='multipleYears'
          index={0}
          checked={isMultiYears}
          handleFC={handleUpdateMultipleYears}
          label='MULTI'
          isLabelBold={true}
        />
        <CheckBox name='allYears'
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
            <CheckBox name={y.name}
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
          <CheckBox name='multipleMonths'
            index={0}
            checked={isMultiMonths}
            handleFC={handleUpdateMultipleMonths}
            label='MULTI'
            isLabelBold={true}
          />
          <CheckBox name='allMonths'
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
              <CheckBox name={m.month.toString()}
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
