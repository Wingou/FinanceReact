import React from "react"
import { Categorie, ModifPriceInput } from "../../types/common"
import { ModifViewProps } from "../board/boardView.d"
import { SelectObj } from "../add/add"
import { formatPriceWithZero } from "../../utils/helper"

export const ModifForm: React.FC<ModifViewProps> = (ModifViewProps) => {
    const { modifPriceInput, objects, filteredCats } = ModifViewProps
    const { catId, objId } = modifPriceInput
    return <tr className='InputAdd_Form'>
        <td>        <button>
            OK
        </button></td>
        <td>
            <input
                key={'Input_Date'}
                className='InputAdd_Input_Date'
                type='date'
                name='dateAction'
                value={modifPriceInput.actionDate}
            // onChange={e => handleDateInput(e)}
            />
        </td>
        <td>
            <SelectObj catId={-1} objId={objId} categories={[]} objects={objects} />
        </td>
        <td> {formatPriceWithZero(modifPriceInput.amount)}</td>
        {filteredCats.map((fcat) => {
            return fcat.id !== catId ? <td></td> : <td>
                <input
                    key={'Input_Price'}
                    type='text'
                    name='price'
                    placeholder='Prix en'
                    value={modifPriceInput.amount}
                    // onChange={e => handlePriceInput(e)}
                    pattern='/^-?\d*\.?\d{0,2}$/'
                />
                <input
                    key={'Currency'}
                    // className={`InputAdd_Input_Currency ${Red_Border_Price}`}
                    type='text'
                    defaultValue='€'
                    disabled={true}
                />
            </td>
        })}
        <td>
            <input
                key={'Input_Comment'}
                className='InputAdd_Input_Comment'
                type='text'
                name='comment'
                placeholder='Commentaire ici...'
                // onChange={e => handleCommentInput(e)}
                value={modifPriceInput.comment}
            />
        </td>
        <td>{modifPriceInput.dateCreate}</td>
        <td>{modifPriceInput.dateModif}</td>
        <td>{modifPriceInput.template}</td>
    </tr >


}