import React from 'react'
import {
    formatDateFR,
    formatPrice,
    formatPriceWithZero
} from '../../utils/helper'
import { Categorie, ModifPriceInput, Object, Price } from '../../types/common'
import { handleModif, handleModifPrice } from '../../actions/modif'
import { BoardProps, FilteredCatsProps, FilteredProps, SimpleLineProps, SumLineProps, TitleAmountMap } from './boardView.d'
import { ModifLine } from '../modif/modif'
import { DelLine } from '../del/del'
import { SUM_TYPE } from '../../constants/constants'

export const SimpleLine: React.FC<SimpleLineProps> = ({ filteredCats, p, index, lastMutatedPriceId }) => {

    const modifPriceInputForReserve = {
        id: p.id,
        catId: p.cat.id,
        objId: p.obj.id,
        amount: p.amount.toString(),
        actionDate: p.actionDate,
        comment: p.comment,
        dateCreate: p.dateCreate,
        dateModif: p.dateModif,
        template: 1
    } as ModifPriceInput

    const templateColor =
        {
            1: 'bg-orange-300',
            2: 'bg-gray-300',
        }[p.template] || 'bg-white-200'
    const lineColor = p.id === lastMutatedPriceId ? `border-2 border-red-500 ${templateColor}` : templateColor
    const btnStyleDisabled = p.template === 2 ? 'btnTemplate2' : 'btnTemplate'

    return <tr key={`tr_SimpleLine_${index}`} className={lineColor}>
        <td key={`td_admin_${index}`}>
            <button className={`btnAdmin ${btnStyleDisabled}`} disabled={p.template === 2} onClick={() => handleModifPrice(modifPriceInputForReserve)}>~</button>
            <button className={`btnAdmin ${btnStyleDisabled}`} disabled={p.template === 2} onClick={() => handleModif(p)}>...</button>
            <button className={`btnAdmin ${btnStyleDisabled}`} disabled={p.template === 2} onClick={() => handleModif({ ...p, template: 2 })}>X</button>
        </td>
        <td key={`td_date_${index}`}>{formatDateFR(p.actionDate)}</td>
        <td key={`td_obj_${index}`}>{p.obj.name}</td>
        <td
            key={`td_amount_${index}`}
            className={'moneyCell ' + (p.amount < 0 ? 'negative' : 'positive')}
        >
            {formatPrice(p.amount)}
        </td>
        {filteredCats.map((cat, index) => {
            const price = cat.id === p.cat.id ? p.amount : 0
            return (
                <td
                    key={`td_price_by_${cat.id}_${index}`}
                    className={'moneyCell ' + (price < 0 ? 'negative' : 'positive')}
                >
                    {formatPrice(price)}
                </td>
            )
        })}
        <td key={`td_comment_${index}`}>{p.comment}</td>
        <td key={`td_dateCreate_${index}`}>{formatDateFR(p.dateModif)}</td>
        <td key={`td_dateModif_${index}`}>{formatDateFR(p.dateCreate)}</td>
        <td key={`td_template_${index}`}>{p.template}</td>
    </tr>
}




export const SumLines: React.FC<FilteredCatsProps> = ({ filteredCats }) => {
    return (
        <tbody className='SumLineTBody'>
            <SumLine filteredCats={filteredCats} sumType='RECETTE' />
            <SumLine filteredCats={filteredCats} sumType='DEPENSE' />
            <SumLine filteredCats={filteredCats} sumType='TOTAL' />
            <SumLine filteredCats={filteredCats} sumType='RESERVE' />
        </tbody>
    )
}


const SumLine: React.FC<SumLineProps> = ({ filteredCats, sumType }) => {
    const amount = filteredCats.reduce((acc, cats) => {
        if (cats.isOn) {
            switch (sumType) {
                case 'RECETTE':
                    return acc + cats.recette
                case 'DEPENSE':
                    return acc + cats.depense
                case 'TOTAL':
                    return acc + cats.recette + cats.depense
                default:
                    return acc
            }
        } else {
            return acc
        }
    }, 0)


    const titleAmount: string =
        ({
            'RECETTE': 'RECETTE',
            'DEPENSE': 'DEPENSE',
            'RESERVE': 'RESERVE',
            'TOTAL': 'total (R-D)'
        } as TitleAmountMap)[sumType as SUM_TYPE] || ''

    const formatPriceFunc =
        sumType === 'TOTAL' ? formatPriceWithZero : formatPrice
    return (
        <tr key={'tr_' + sumType}>
            <td key={'td_' + sumType} className='SumTitleCell' colSpan={3}>
                {titleAmount}
            </td>
            <td
                key={'td_amont_' + sumType}
                className={'moneyCell ' + (amount < 0 ? 'negative' : 'positive')}
            >
                {formatPriceFunc(amount)}
            </td>
            {filteredCats.map((cat, index) => {
                const price: number =
                    {
                        'RECETTE': cat.recette,
                        'DEPENSE': cat.depense,
                        'RESERVE': cat.reserve,
                        'TOTAL': cat.recette + cat.depense
                    }[sumType] || 0
                return (
                    <td
                        key={'td_price_' + sumType + index}
                        className={'moneyCell ' + (price < 0 ? 'negative' : 'positive')}
                    >
                        {formatPriceFunc(price)}
                    </td>
                )
            })}
            <td key={'td_comment_' + sumType}> </td>
            <td key={'td_dateCreate_' + sumType}> </td>
            <td key={'td_dateModif_' + sumType}> </td>
            <td key={'td_template_' + sumType}> </td>
        </tr>
    )
}
