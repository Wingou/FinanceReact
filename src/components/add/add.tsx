import {
  handleAddCommentInput,
  handleAddDateInput,
  handleAddPriceInput,
  handleAddPriceCheck
} from '../../actions/add'
import React, { useContext } from 'react'
import { SelectCat, SelectObj } from '../common/selectList'
import { handleCancel } from '../../actions/cancel'
import { InputDate, InputPrice, InputText } from '../common/inputForm'
import { BoardViewContext } from '../../containers/boardViewContainer'

export const AddPriceInput: React.FC = () => {
  const { addPriceInput, categoryInput, objectInput } = useContext(BoardViewContext)
  const { objId } = objectInput
  const { amount } = addPriceInput
  const isObjetOK = objId !== -1
  const isPriceOK =
    /^-?\d*\.?\d{0,2}$/.test(amount) &&
    amount !== '' &&
    amount !== '-'
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
      <SelectCat caller='ADD' /><br />
      <SelectObj caller='ADD' />
      <InputText
        name='comment'
        placeholder='Commentaire ici...'
        handleFC={handleAddCommentInput}
        value={addPriceInput.comment}
        width='w-60' />
      <div>
        <button
          onClick={() => {
            handleAddPriceCheck(addPriceInput, objectInput)
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




