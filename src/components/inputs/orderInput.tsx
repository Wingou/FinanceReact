import React from 'react'
import { OrderInputProps } from '../board/boardView.d'
import { handleCancel } from '../../actions/cancel'
import { OrderSelectValue } from '../../types/common'
import { handleOrderInput, handleToggleOrderDir } from '../../actions/order'
import { OrderSelectProps } from './input'

export const OrderInput: React.FC<OrderInputProps> = (props) => {
  const { orderOptions } = props
  const { orderSelectValues } = orderOptions

  const orderSelectValuesSelected = orderSelectValues.filter((o) => o.selectedPos !== -1)
    .sort((a, b) => a.selectedPos - b.selectedPos)
  const orderSelectValuesNb = orderSelectValuesSelected.length

  return <div className='searchDivWrap' >
    <div className='orderByLabel'>ORDER BY</div>
    {
      orderSelectValuesSelected.map((_c, index) => {
        return <SelectOrder key={`selectOrder_${index}`} orderSelectValues={orderSelectValues} index={index} />
      }
      )
    }
    <SelectOrder key={`selectOrder_${orderSelectValuesNb}`} orderSelectValues={orderSelectValues} index={orderSelectValuesNb} />

    <div  >
      <button
        className={`btnAdmin btnAdminSize3 btnEnabled `}
        onClick={() => {
          handleCancel('ORDER')
        }}
        title='Cliquer pour réinitaliser les critères'
      >
        ¤
      </button>
    </div>
  </div>
}

const SelectOrder: React.FC<OrderSelectProps> = ({ orderSelectValues, index }) => {
  const orderSelectValue = orderSelectValues.find((o: OrderSelectValue): boolean => o.selectedPos == index) as OrderSelectValue
  const selectedValue = orderSelectValue?.value as string
  return (
    <div>
      {orderSelectValue && <button
        className={`btnOrderDir`}
        onClick={() => {
          handleToggleOrderDir(orderSelectValue)
        }}
        title='Order by ASC or DESC'
      >
        {orderSelectValue?.dir === 'ASC' ? '#' : '¤'}
      </button>}
      <select
        key={`selectOrder_${index}`}
        className='orderInput_Select'
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleOrderInput(e, index)}
        value={selectedValue}
      >
        <option
          key={`selectOption_${index}_NONE`}
          value='NONE'
          title={selectedValue ? `Remove this order criteria` : `Add this order criteria`}
        >
          {selectedValue ? `- criteria` : `+ criteria`}
        </option>
        {orderSelectValues
          .map((col, i) => {
            return (
              <option
                key={`selectOption_${index}_${i}`}
                value={col.value}
                disabled={col.selectedPos !== -1}
              >
                {col.name}
              </option>
            )
          })}
      </select>
    </div>
  )
}
