import React from "react"
import { ModifLineProps } from "../board/boardView.d"
import { handleModifCommentInput, handleModifDateInput, handleModifPrice, handleModifPriceInput } from "../../actions/modif"
import { SelectObj } from "../common/selectList"
import { handleCancel } from "../../actions/cancel"
import { InputDate, InputPrice, InputText } from "../common/inputForm"
import { formatDateFR, formatTemplate } from "../../utils/helper"

export const ModifLine: React.FC<ModifLineProps> = (ModifLineProps) => {
    const { modifPriceInput, objects, selectedCats } = ModifLineProps
    const { catId, objId } = modifPriceInput
    return <tr key='tr_ModifLine' className='trFocus'>
        <td key='td_ModifLine_OK'>
            <button
                className='btnAdmin btnAdminSize2 btnEnabled'
                onClick={() => {
                    handleModifPrice(modifPriceInput)
                }}
                title='Cliquer pour modifier'
            >
                MOD
            </button>
            <button
                className='btnAdmin btnAdminSize2 btnEnabled'
                onClick={() => {
                    handleCancel('MODIF')
                }}
                title='Cliquer pour annuler la modification'
            >
                BACK
            </button>

        </td>
        <td key='td_ModifLine_Date'>
            <InputDate
                name='dateAction'
                value={modifPriceInput.actionDate}
                handleFC={e => handleModifDateInput(e)}
            />
        </td>
        <td key='td_ModifLine_Objects'>
            <SelectObj caller='MODIF' catId={-1} objId={objId} categories={[]} objects={objects} />
        </td>
        <td key='td_ModifLine_Amount'>
            <InputPrice name='price'
                placeholder='Prix en'
                value={modifPriceInput.amount}
                handleFC={e => handleModifPriceInput(e)} />
        </td>
        {selectedCats.map((fcat) => {
            return fcat.id === catId
                ? <td key='td_ModifLine_Price'>{modifPriceInput.amount}</td>
                : <td key={`td_ModifLine_by_${fcat.id}_blank`}></td>
        })}
        <td key='td_ModifLine_Comment'>
            <InputText
                name='comment'
                placeholder='Commentaire ici...'
                handleFC={e => handleModifCommentInput(e)}
                value={modifPriceInput.comment}
                width='w-60' />
        </td>
        <td key='td_ModifLine_DateCreate'>{formatDateFR(modifPriceInput.dateCreate)}</td>
        <td key='td_ModifLine_DateModif'>{formatDateFR(modifPriceInput.dateModif)}</td>
        <td key='td_ModifLine_Template'>{formatTemplate(modifPriceInput.template)}</td>
    </tr >


}