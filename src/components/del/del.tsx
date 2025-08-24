import { formatDateFR, formatPrice } from "../../utils/helper"
import React, { useContext } from "react"
import { handleModifPrice } from "../../actions/modif"
import { handleCancel } from "../../actions/cancel"
import { BoardViewContext } from "../../containers/boardViewContainer"
import { Price } from "../../types/common"

export const DelLine: React.FC<{ price: Price }> = ({ price }) => {
    const { view, selectedCats, modifPriceInput } = useContext(BoardViewContext)
    const { isColObj, isColAmount, isColCat, isColComment, isColDateCreate, isColDateModif, isColTemplate } = view
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
                    handleCancel('MODIF_PRICE')
                }}
                title='Cliquer pour annuler la suppression'
            >
                BACK
            </button>
        </td>
        <td key={`td_date`}>{formatDateFR(price.actionDate)}</td>
        {isColObj && <td key={`td_obj`}>{price.obj.name}</td>}
        {isColAmount && <td
            key={`td_amount`}
            className={'moneyCell ' + (price.amount < 0 ? 'negative' : 'positive')}
        >
            {formatPrice(price.amount)}
        </td>}
        {isColCat && selectedCats.map((cat, index) => {
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
        {isColComment && <td key={`td_comment`}>{price.comment}</td>}
        {isColDateCreate && < td key={`td_dateCreate`}>{formatDateFR(price.dateModif)}</td>}
        {isColDateModif && <td key={`td_dateModif`}>{formatDateFR(price.dateCreate)}</td>}
        {isColTemplate && <td key={`td_template`}>{price.template}</td>}
    </tr >
}