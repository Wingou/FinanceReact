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
import { InputDate, InputPrice, InputText } from '../common/inputForm'

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
  const invalidDisableBtn = !isPriceOK || !isObjetOK ? 'btnDisabled' : 'btnEnabled'
  return (
    <div key='div_Addinput' className='addInput'>
      <InputPrice
        name='price'
        placeholder='Prix en'
        handleFC={handleAddPriceInput}
        value={addPriceInput.amount}
      />
      <InputDate
        name='dateAction'
        value={addPriceInput.actionDate}
        handleFC={handleAddDateInput}
      />
      <SelectCat {...addLineProps} /><br />
      <SelectObj caller='ADD' categories={categories} objects={objects} catId={catId} objId={objId} />
      <InputText
        name='comment'
        placeholder='Commentaire ici...'
        handleFC={handleAddCommentInput}
        value={addPriceInput.comment}
        width='w-60' />
      <div>
        <button
          onClick={() => {
            handleAddPrice(addPriceInput)
          }}
          title={btnOK_Title}
          disabled={isOKBtnDisabled}
          className={`btnAdmin btnAdminSize0 ${invalidDisableBtn}`}
        >
          OK
        </button>
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




