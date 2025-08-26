import React, { useContext } from 'react'
import { handleCancel } from '../../actions/cancel'
import { OrderOption, } from '../../types/common'
import { handleOrderInput, handleToggleOrderDir } from '../../actions/order'
import { BoardViewContext } from '../../containers/boardViewContainer'

export const OrderInput: React.FC = () => {
  const { orderOptions } = useContext(BoardViewContext)
  const orderSelectValuesSelected = orderOptions.filter((o: OrderOption) => o.selectedPos !== -1)
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
  const orderOptions_: OrderOption[] = orderOptions.filter((o: OrderOption): boolean => o.selectedPos === index)
  const isOrderOption = orderOptions_.length > 0
  const orderOptionValue: string = isOrderOption ? orderOptions_[0].value : 'NONE'
  return (
    <div>
      {isOrderOption && <button
        className={`btnOrderDir`}
        onClick={() => {
          handleToggleOrderDir(orderOptions_[0])
        }}
        title='Order by ASC or DESC'
      >
        {orderOptions_[0].dir === 'ASC' ? '#' : '¤'}
      </button>}
      <select
        key={`selectOrder_${index}`}
        className='orderInput_Select'
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleOrderInput(e, index)}
        value={orderOptionValue}
      >
        <option
          key={`selectOption_${index}_NONE`}
          value='NONE'
          title={orderOptionValue ? `Remove this order criteria` : `Add this order criteria`}
        >
          {isOrderOption ? `- criteria` : `+ criteria`}
        </option>
        {orderOptions
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
