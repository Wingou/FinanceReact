import React, { useContext } from 'react'
import {
    formatDateDisplayMonthYear,
    formatDateDisplayYear,
    formatDateFR,
    formatFirstDay,
    formatFirstMonth,
    formatPrice,
    formatPriceWithZero,
    formatTemplate
} from '../../utils/helper'
import { ModifPriceInput } from '../../types/common'
import { handleModif, handleModifPrice } from '../../actions/modif'
import { SimpleLineProps, TitleAmountMap } from '../board/boardView.d'
import { SUM_TYPE } from '../../types/constants'
import { handleSearchObj } from '../../actions/search'
import { BoardViewContext } from '../../containers/boardViewContainer'

export const SimpleLine: React.FC<SimpleLineProps> = ({ price, index }) => {
    const { selectedCats, view, searchOptions } = useContext(BoardViewContext)
    const { isColMonth, isColDay, isColObj, isColAmount, isColCat, isColComment, isColDateCreate, isColDateModif, isColTemplate } = view
    const { lastMutatedPriceId } = searchOptions
    const modifPriceInputForReserve = {
        ...price,
        catId: price.cat.id,
        objId: price.obj.id,
        amount: price.amount.toString(),
        template: price.template === 0 ? 1 : 0
    } as ModifPriceInput
    const simpleLineStyleByTemplate =
        {
            0: 'SimpleLineActivated',
            1: 'SimpleLineReserved',
            2: 'SimpleLineDeleted',
        }[price.template]
    const trSimpleLine = price.id === lastMutatedPriceId
        ? 'FocusedLine'
        : ''
    const groupbyLineStyle = price.isGroupby ? 'GroupbyLine' : ''
    const btnStyleDisabled = price.template === 2 || !isColObj || !isColDay ? 'btnDisabled' : 'btnEnabled'
    const commentTitle = price.comment === '' ? 'no comment' : 'commentaire:\n' + price.comment
    const rechObjTitle = `Copier sur le champ recherche :\n${price.obj.name}`

    const isColDateModif_ = isColDateModif && isColObj && isColDay
    const isColDateCreate_ = isColDateCreate && isColObj && isColDay

    return <tr key={`tr_SimpleLine_${index}`} className={trSimpleLine + ' trhover ' + simpleLineStyleByTemplate + ' ' + groupbyLineStyle} title={commentTitle}>
        <td key={`td_admin_${index}`}>
            <button className={`btnAdmin btnAdminSize3 ${btnStyleDisabled}`} disabled={price.template === 2 || !isColObj || !isColDay} onClick={() => handleModifPrice(modifPriceInputForReserve)}>~</button>
            <button className={`btnAdmin btnAdminSize3 ${btnStyleDisabled}`} disabled={price.template === 2 || !isColObj || !isColDay} onClick={() => handleModif(price)}>...</button>
            <button className={`btnAdmin btnAdminSize3 ${btnStyleDisabled}`} disabled={price.template === 2 || !isColObj || !isColDay} onClick={() => handleModif({ ...price, template: 2 })}>X</button>
        </td>
        <td key={`td_date_${index}`} className='text-center' >{
            isColDay ? formatDateFR(price.actionDate) :
                isColMonth ?
                    formatDateDisplayMonthYear(formatFirstDay(price.actionDate))
                    : formatDateDisplayYear(formatFirstMonth(price.actionDate))
        }</td>
        {isColObj && <td key={`td_obj_${index}`}
            title={rechObjTitle + '\n\n' + commentTitle}
            onClick={() => handleSearchObj(price.obj.name)}>
            {price.obj.name}
        </td>}
        {isColAmount && <td key={`td_amount_${index}`} className={'moneyCell ' + (price.amount < 0 ? 'negative' : 'positive')}>
            {formatPrice(price.amount)}
        </td>}
        {
            isColCat && selectedCats.map((cat, index) => {
                const price_ = cat.id === price.cat.id ? price.amount : 0
                return (
                    <td key={`td_price_by_${cat.id}_${index}`} className={'moneyCell ' + (price_ < 0 ? 'negative' : 'positive')}>
                        {formatPrice(price_)}
                    </td>
                )
            })
        }
        {isColComment && <td key={`td_comment_${index}`}>{price.comment}</td>}
        {isColDateCreate_ && isColObj && <td key={`td_dateCreate_${index}`}>{formatDateFR(price.dateCreate)}</td>}
        {isColDateModif_ && isColObj && <td key={`td_dateModif_${index}`}>{formatDateFR(price.dateModif)}</td>}
        {isColTemplate && <td key={`td_template_${index}`}>{formatTemplate(price.template)}</td>}
    </tr >
}

export const SumLines: React.FC = () => {
    const { searchOptions } = useContext(BoardViewContext)
    const { isSearchReserved } = searchOptions
    return (
        <tbody className='SumLineTBody'>
            <SumLine sumType='RECETTE' />
            <SumLine sumType='DEPENSE' />
            <SumLine sumType='TOTAL' />
            {isSearchReserved && <SumLine sumType='RESERVE' />}
        </tbody>
    )
}

const SumLine: React.FC<{ sumType: SUM_TYPE }> = ({ sumType }) => {
    const { selectedCats, view } = useContext(BoardViewContext)
    const { isColDay, isColObj, isColAmount, isColCat, isColComment, isColDateCreate, isColDateModif, isColTemplate } = view
    const amount = selectedCats.reduce((acc, cats) => {
        if (cats.isOn) {
            switch (sumType) {
                case 'RECETTE':
                    return acc + cats.recette
                case 'DEPENSE':
                    return acc + cats.depense
                case 'RESERVE':
                    return acc + cats.reserve
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
        } as TitleAmountMap)[sumType as SUM_TYPE]

    const formatPriceFunc = sumType === 'TOTAL' ? formatPriceWithZero : formatPrice
    const colspanSumLineEnd = [
        isColComment,
        isColObj && isColDay && isColDateCreate,
        isColObj && isColDay && isColDateModif,
        isColTemplate
    ].reduce((acc: number, isCol: boolean): number => {
        return isCol ? acc + 1 : acc
    }
        , 0)
    const colspanSumLineStart = 3
    const colspan = isColObj ? colspanSumLineStart : colspanSumLineStart - 1
    return (
        <tr key={'tr_' + sumType} className={`sumLine_${titleAmount}`}>
            <td key={'td_' + sumType} className='SumTitleCell' colSpan={colspan}>
                {titleAmount}
            </td>
            {isColAmount && <td
                key={'td_amont_' + sumType}
                className={'moneyCell ' + (amount < 0 ? 'negative' : 'positive')}
            >
                {formatPriceFunc(amount)}
            </td>}
            {isColCat && selectedCats.map((cat, index) => {
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
            {colspanSumLineEnd !== 0 && <td key={'td_empty_' + sumType} colSpan={colspanSumLineEnd}></td>}
        </tr>
    )
}