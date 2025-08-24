import React, { useContext } from 'react'
import {
  handleUpdateYear,
  handleUpdateMonth,
  handleUpdateAllYears,
  handleUpdateAllMonths,
  handleUpdateMultipleYears,
  handleUpdateMultipleMonths
} from '../../actions/search'
import { CheckBox } from '../common/inputForm'
import { BoardViewContext } from '../../containers/boardViewContainer'

export const DateInput: React.FC = () => {
  const { years, months, isAllYearsChecked, isAllMonthsChecked, isLast, searchOptions } = useContext(BoardViewContext)
  const { isMultiYears, isMultiMonths } = searchOptions
  const disabledDiv = isLast ? 'disabledDiv' : ''
  return <div key='div_dateInput' title={isLast ? 'Dates cannot be changed when LAST mode is activated' : 'Select years and months to filter'}>
    <div className={`searchDiv ${disabledDiv}`} >
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
      <div className={`searchDiv ${disabledDiv}`} >
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
}
