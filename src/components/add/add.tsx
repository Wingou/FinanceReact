import {
  handleAddPrice,
  handleAddCommentInput,
  handleAddDateInput,
  handleAddPriceInput
} from '../../actions/add'
import React from 'react'
import { SelectCat, SelectObj } from '../common/selectList'
import { AddLineProps } from '../common/selectList.d'
import { handleCancel } from '../../actions/cancel'
import { CURRENT_DATE } from '../../constants/constants'

export const AddPriceInput: React.FC<AddLineProps> = (addLineProps) => {
  const { addPriceInput, categories, objects } = addLineProps
  const { catId, objId } = addPriceInput
  const isObjetOK = addPriceInput.objId !== -1
  const isPriceOK =
    /^-?\d*\.?\d{0,2}$/.test(addPriceInput.amount) &&
    addPriceInput.amount !== '' &&
    addPriceInput.amount !== '-'

  const btnOK_Title = !isObjetOK
    ? 'Objet manquant !'
    : !isPriceOK
      ? 'Prix incorrect !'
      : 'Valider'
  const isOKBtnDisabled = !(isObjetOK && isPriceOK)
  const InvalidRedBorder = !isPriceOK ? 'invalidValue' : ''
  const invalidDisableBtn = !isPriceOK || !isObjetOK ? 'btnDisabled' : 'btnEnabled'

  return (


    <div key='div_Addinput' className='addInput'>

      <input
        key={'Input_Date'}
        className='addInput_Date'
        type='date'
        name='dateAction'
        value={addPriceInput.actionDate}
        onChange={e => handleAddDateInput(e)}
      />


      <SelectCat {...addLineProps} /><br />

      <SelectObj caller='ADD' categories={categories} objects={objects} catId={catId} objId={objId} />

      <div className='addInput_PriceAndCurrency'>
        <input
          key={'Input_Price'}
          className={`addInput_Price ${InvalidRedBorder}`}
          type='text'
          name='price'
          placeholder='Prix en'
          value={addPriceInput.amount}
          onChange={e => handleAddPriceInput(e)}
          pattern='/^-?\d*\.?\d{0,2}$/'
        />
        <input
          key={'Currency'}
          className={`addInput_Currency ${InvalidRedBorder}`}
          type='text'
          defaultValue='€'
          disabled={true}
        />
      </div>



      <input
        key={'Input_Comment'}
        className='addInput_Comment'
        type='text'
        name='comment'
        placeholder='Commentaire ici...'
        onChange={e => handleAddCommentInput(e)}
        value={addPriceInput.comment}
      />
      <div>
        <button
          onClick={() => {
            handleAddPrice(addPriceInput)
          }}
          title={btnOK_Title}
          disabled={isOKBtnDisabled}
          className={`btnAdmin btnAdminSize1 ${invalidDisableBtn}`}
        >
          OK
        </button>
      </div>
      <div className='addInput_Label'>
        |
      </div>
      <div  >
        <button
          className={`btnAdmin btnAdminSize3 btnEnabled `}
          onClick={() => {
            handleCancel('ADD')
          }}
          title='Cliquer pour réinitaliser les valeurs'
        >
          ¤
        </button>
      </div>


    </div >



  )
}




