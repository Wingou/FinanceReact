import { formatDateFR, formatPrice } from "../../utils/helper"
import React from "react"
import { handleModifPrice } from "../../actions/modif"
import { DelLineProps } from "./del.d"
import { handleCancel } from "../../actions/cancel"

export const DelLine: React.FC<DelLineProps> = ({ filteredCats, price, modifPriceInput }) => {
    return <tr key={`tr_DelLine`} className='trFocus'   >
        <td key={`td_admin`}>
            <button
                className='btnAdmin btnAdminSize2 btnEnabled'
                onClick={() => {
                    handleModifPrice(modifPriceInput)
                }}
                title='Cliquer pour supprimer'
            >
                DEL
            </button>
            <button
                className='btnAdmin btnAdminSize2 btnEnabled'
                onClick={() => {
                    handleCancel('MODIF')
                }}
                title='Cliquer pour annuler la suppression'
            >
                BACK
            </button>
        </td>
        <td key={`td_date`}>{formatDateFR(price.actionDate)}</td>
        <td key={`td_obj`}>{price.obj.name}</td>
        <td
            key={`td_amount`}
            className={'moneyCell ' + (price.amount < 0 ? 'negative' : 'positive')}
        >
            {formatPrice(price.amount)}
        </td>
        {filteredCats.map((cat, index) => {
            const p = cat.id === price.cat.id ? price.amount : 0
            return (
                <td
                    key={`td_price_by_${cat.id}`}
                    className={'moneyCell ' + (p < 0 ? 'negative' : 'positive')}
                >
                    {formatPrice(p)}
                </td>
            )
        })}
        <td key={`td_comment`}>{price.comment}</td>
        <td key={`td_dateCreate`}>{formatDateFR(price.dateModif)}</td>
        <td key={`td_dateModif`}>{formatDateFR(price.dateCreate)}</td>
        <td key={`td_template`}>{price.template}</td>
    </tr>
}