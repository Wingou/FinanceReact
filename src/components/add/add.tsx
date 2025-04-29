import {
  handleAddPrice,
  handleCatIdInput,
  handleCommentInput,
  handleDateInput,
  handleObjIdInput,
  handlePriceInput
} from '../../actions/add'
import { getCatById, getObjById } from '../../utils/helper'
import { AddPriceInput, Categorie, Object } from '../../types/common'
import React from 'react'
import { CALLER } from '../../constants/constants'
import { handleModifObjIdInput } from '../../actions/modif'
import { SelectCat, SelectObj } from '../common/selectList'
import { AddFormProps } from '../common/selectList.d'



export const AddForm: React.FC<AddFormProps> = (addFormProps) => {
  const { addPriceInput, categories, objects } = addFormProps
  const { catId, objId } = addPriceInput
  const isObjetOK = addPriceInput.objId !== -1
  const isPriceOK =
    /^-?\d*\.?\d{0,2}$/.test(addPriceInput.amount) &&
    addPriceInput.amount !== '' &&
    addPriceInput.amount !== '-'

  const buttonOKTitle = !isObjetOK
    ? 'Objet manquant !'
    : !isPriceOK
      ? 'Prix incorrect !'
      : 'Valider'
  const buttonOKDisabled = !(isObjetOK && isPriceOK)
  const Red_Border_Price = !isPriceOK ? 'Red_Border' : ''
  const Red_Border_Button = !isPriceOK || !isObjetOK ? 'Red_Border' : ''

  return (
    <div className='InputAdd_Form'>
      <input
        key={'Input_Date'}
        className='InputAdd_Input_Date'
        type='date'
        name='dateAction'
        value={addPriceInput.actionDate}
        onChange={e => handleDateInput(e)}
      />
      <SelectCat {...addFormProps} />
      <SelectObj caller='ADD' categories={categories} objects={objects} catId={catId} objId={objId} />
      <div
        key={'Div_PriceAndCurrency'}
        className={`InputAdd_Div_PriceAndCurrency `}
      >
        <input
          key={'Input_Price'}
          className={`InputAdd_Input_Price ${Red_Border_Price}`}
          type='text'
          name='price'
          placeholder='Prix en'
          value={addPriceInput.amount}
          onChange={e => handlePriceInput(e)}
          pattern='/^-?\d*\.?\d{0,2}$/'
        />
        <input
          key={'Currency'}
          className={`InputAdd_Input_Currency ${Red_Border_Price}`}
          type='text'
          defaultValue='€'
          disabled={true}
        />
      </div>
      <input
        key={'Input_Comment'}
        className='InputAdd_Input_Comment'
        type='text'
        name='comment'
        placeholder='Commentaire ici...'
        onChange={e => handleCommentInput(e)}
        value={addPriceInput.comment}
      />
      <button
        className={`InputAdd_Button_OK ${Red_Border_Button}`}
        onClick={() => {
          handleAddPrice(addPriceInput)
        }}
        disabled={buttonOKDisabled}
        title={buttonOKTitle}
      >
        OK
      </button>
    </div>
  )
}
