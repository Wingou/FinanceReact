import React from "react"
import { Categorie, ModifPriceInput } from "../../types/common"
import { ModifLineProps } from "../board/boardView.d"

import { formatPriceWithZero } from "../../utils/helper"
import { handleModifCommentInput, handleModifDateInput, handleModifPrice, handleModifPriceInput } from "../../actions/modif"
import { SelectObj } from "../common/selectList"

export const ModifLine: React.FC<ModifLineProps> = (ModifLineProps) => {
    const { modifPriceInput, objects, filteredCats } = ModifLineProps
    const { catId, objId } = modifPriceInput
    return <tr key='tr_ModifLine' className='InputModif_Form'>
        <td key='td_ModifLine_OK'>
            <button
                className={`InputModif_Button_OK`}
                onClick={() => {
                    handleModifPrice(modifPriceInput)
                }}
                title='Cliquer pour modifier'
            >
                OK
            </button>


        </td>
        <td key='td_ModifLine_Date'>
            <input
                key={'Input_Date'}
                className='InputModif_Input_Date'
                type='date'
                name='dateAction'
                value={modifPriceInput.actionDate}
                onChange={e => handleModifDateInput(e)}
            />
        </td>
        <td key='td_ModifLine_Objects'>
            <SelectObj caller='MODIF' catId={-1} objId={objId} categories={[]} objects={objects} />
        </td>
        <td key='td_ModifLine_Amount'>
            <input
                key={'Input_Price'}
                type='text'
                name='price'
                placeholder='Prix en'
                value={modifPriceInput.amount}
                onChange={e => handleModifPriceInput(e)}
                pattern='/^-?\d*\.?\d{0,2}$/'
            />
            <input
                key={'Currency'}
                // className={`InputModif_Input_Currency ${Red_Border_Price}`}
                type='text'
                defaultValue='€'
                disabled={true}
            />

        </td>
        {filteredCats.map((fcat) => {
            return fcat.id === catId
                ? <td key='td_ModifLine_Price'>{modifPriceInput.amount}</td>
                : <td key={`td_ModifLine_by_${fcat.id}_blank`}></td>
        })}
        <td key='td_ModifLine_Comment'>
            <input
                key={'Input_Comment'}
                className='InputModif_Input_Comment'
                type='text'
                name='comment'
                placeholder='Commentaire ici...'
                onChange={e => handleModifCommentInput(e)}
                value={modifPriceInput.comment}
            />
        </td>
        <td key='td_ModifLine_DateCreate'>{modifPriceInput.dateCreate}</td>
        <td key='td_ModifLine_DateModif'>{modifPriceInput.dateModif}</td>
        <td key='td_ModifLine_Template'>{modifPriceInput.template}</td>
    </tr >


}