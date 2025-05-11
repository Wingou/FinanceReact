import React from 'react'
import {
  handleUpdateSearchWord,
  handleUpdateSearchMin,
  handleUpdateSearchMax,
  handleUpdateSearchDel,
  handleUpdateSearchReserved
} from '../../actions/search'
import { CheckBox, InputPrice, InputText } from '../common/inputForm'
import { OrderInputProps, SearchWordInputProps } from '../board/boardView.d'
import { handleCancel } from '../../actions/cancel'
import { OrderOptions, OrderSelectValue } from '../../types/common'
import { handleOrderInput } from '../../actions/order'

export const OrderInput: React.FC<OrderInputProps> = (props) => {

  const { orderOptions } = props
  const { orderSelectValues } = orderOptions

  const orderSelectValuesSelected = orderSelectValues.filter((o) => o.selectedPos !== -1)
    .sort((a, b) => a.selectedPos - b.selectedPos)

  console.log("orderSelectValuesSelected:", orderSelectValuesSelected)
  return <div className='searchDiv' >
    <SelectOrder key='selectOrder_0' orderSelectValues={orderSelectValues} index={0} />

    {

      orderSelectValuesSelected.map((_c, index) => {
        console.log("index:::", index)
        return <SelectOrder key={`selectOrder_${index}`} orderSelectValues={orderSelectValues} index={index + 1} />
      }
      )
    }






    <div className='addInput_Label'>
      |
    </div>
    <div  >
      <button
        className={`btnAdmin btnAdminSize3 btnEnabled `}
        onClick={() => {
          handleCancel('ORDER')
        }}
        title='Cliquer pour réinitaliser les valeurs'
      >
        ¤
      </button>
    </div>
  </div>
}

interface OrderSelectProps {
  orderSelectValues: OrderSelectValue[]
  index: number
}



const SelectOrder: React.FC<OrderSelectProps> = ({ orderSelectValues, index }) => {


  return (
    <select
      key={`selectOrder_${index}`}
      className='addInput_Select'
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleOrderInput(e, index)}
    >
      <option
        key={`selectOption_${index}_NONE`}
        value='NONE'

      >
        ¤ TRI ¤
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
  )
}
