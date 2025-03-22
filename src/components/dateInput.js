import React from 'react'
import { handleUpdateYear, handleUpdateMonth } from '../actions/search'

export const DateInput = ({ years, months }) => {
  console.log("years", years)
  console.log("months", months)
  const result = (
    <div className='DateDiv'>
      {'YEAR '}
      { years.map(    y => {return <label >
                                    <input
                                      className='DateInput'
                                      type='checkbox'
                                      name='selectedYear'
                                      defaultValue={y.year}
                                      onChange={e => { handleUpdateYear(e)}}
                                    />  
                                    {y.year}
                                    </label>
                          }
              )
    }
      <br />
      {' MONTH '}
      { months.map(    m => {return        <label >              <input
                                  className='DateInput'
                                  type='checkbox'
                                  name='selectedMonth'
                                  defaultValue={m.month}
                                  onChange={e => {
                                    handleUpdateMonth(e)
                                  }}
                                />
                                {m.name}
                                </label>
                          }
              )
    }
    </div>
  )
  return result
}
