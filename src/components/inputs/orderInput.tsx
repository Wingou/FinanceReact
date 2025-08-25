import React, { useContext } from 'react'
import { handleCancel } from '../../actions/cancel'
import { OrderSelectValue } from '../../types/common'
import { handleOrderInput, handleToggleOrderDir } from '../../actions/order'
import { BoardViewContext } from '../../containers/boardViewContainer'
import { initialOrderOptions, initialOrderSelectValueHead, initialOrderSelectValues } from '../../models/initialModel'

export const OrderInput: React.FC = () => {
  const { orderOptions } = useContext(BoardViewContext)
  const { orderSelectValues } = orderOptions
  const orderSelectValuesSelected = orderSelectValues.filter((o) => o.selectedPos !== -1)
    .sort((a, b) => a.selectedPos - b.selectedPos)
  const orderSelectValuesNb = orderSelectValuesSelected.length
  return <div className='searchDivWrap' >
    <div className={`searchCheckboxAdmin`}>
      <div className='searchCheckboxLabel'>ORDER BY</div>
    </div>
    <div className={`searchCheckboxOptions`}>
      {
        orderSelectValuesSelected.map((_c, index) => {
          return <SelectOrder key={`selectOrder_${index}`} index={index} />
        }
        )
      }
      <SelectOrder key={`selectOrder_${orderSelectValuesNb}`} index={orderSelectValuesNb} />
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
  </div>
}

const SelectOrder: React.FC<{ index: number }> = ({ index }) => {
  const { orderOptions } = useContext(BoardViewContext)
  const { orderSelectValues } = orderOptions
  const orderSelectValue: OrderSelectValue = orderSelectValues.find((o: OrderSelectValue): boolean => o.selectedPos === index) ?? initialOrderSelectValueHead
  const selectedValue: string = orderSelectValue?.value
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
