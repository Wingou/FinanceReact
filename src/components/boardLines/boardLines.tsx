import React from 'react'
import {
    formatDateFR,
    formatPrice,
    formatPriceWithZero,
    formatTemplate
} from '../../utils/helper'
import { ModifPriceInput } from '../../types/common'
import { handleModif, handleModifPrice } from '../../actions/modif'
import { SimpleLineProps, SumLineProps, TitleAmountMap } from '../board/boardView.d'
import { SUM_TYPE } from '../../types/constants'
import { SumLinesProps } from './boardLines.d'
import { handleSearchObj } from '../../actions/search'

export const SimpleLine: React.FC<SimpleLineProps> = ({ selectedCats, p, index, lastMutatedPriceId, view }) => {
    const { isColObj, isColAmount, isColCat, isColComment, isColDateCreate, isColDateModif, isColTemplate } = view
    const modifPriceInputForReserve = {
        ...p,
        catId: p.cat.id,
        objId: p.obj.id,
        amount: p.amount.toString(),
        template: p.template === 0 ? 1 : 0
    } as ModifPriceInput
    const simpleLineStyleByTemplate =
        {
            0: 'SimpleLineActivated',
            1: 'SimpleLineReserved',
            2: 'SimpleLineDeleted',
        }[p.template]
    const trSimpleLine = p.id === lastMutatedPriceId
        ? 'FocusedLine'
        : ''
    const btnStyleDisabled = p.template === 2 || !isColObj ? 'btnDisabled' : 'btnEnabled'
    const commentTitle = p.comment == '' ? 'no comment' : 'commentaire:\n' + p.comment
    const rechObjTitle = `Copier sur le champ recherche :\n${p.obj.name}`
    console.log("isCol", isColObj)
    return <tr key={`tr_SimpleLine_${index}`} className={trSimpleLine + ' trhover ' + simpleLineStyleByTemplate} title={commentTitle}>
        <td key={`td_admin_${index}`}>
            <button className={`btnAdmin btnAdminSize3 ${btnStyleDisabled}`} disabled={p.template === 2 || !isColObj} onClick={() => handleModifPrice(modifPriceInputForReserve)}>~</button>
            <button className={`btnAdmin btnAdminSize3 ${btnStyleDisabled}`} disabled={p.template === 2 || !isColObj} onClick={() => handleModif(p)}>...</button>
            <button className={`btnAdmin btnAdminSize3 ${btnStyleDisabled}`} disabled={p.template === 2 || !isColObj} onClick={() => handleModif({ ...p, template: 2 })}>X</button>
        </td>
        <td key={`td_date_${index}`}>{formatDateFR(p.actionDate)}</td>
        {isColObj && <td key={`td_obj_${index}`}
            title={rechObjTitle + '\n\n' + commentTitle}
            onClick={() => handleSearchObj(p.obj.name)}>
            {p.obj.name}
        </td>}
        {isColAmount && <td key={`td_amount_${index}`} className={'moneyCell ' + (p.amount < 0 ? 'negative' : 'positive')}>
            {formatPrice(p.amount)}
        </td>}
        {
            isColCat && selectedCats.map((cat, index) => {
                const price = cat.id === p.cat.id ? p.amount : 0
                return (
                    <td key={`td_price_by_${cat.id}_${index}`} className={'moneyCell ' + (price < 0 ? 'negative' : 'positive')}>
                        {formatPrice(price)}
                    </td>
                )
            })
        }
        {isColComment && <td key={`td_comment_${index}`}>{p.comment}</td>}
        {isColDateCreate && isColObj && <td key={`td_dateCreate_${index}`}>{formatDateFR(p.dateCreate)}</td>}
        {isColDateModif && isColObj && <td key={`td_dateModif_${index}`}>{formatDateFR(p.dateModif)}</td>}
        {isColTemplate && <td key={`td_template_${index}`}>{formatTemplate(p.template)}</td>}
    </tr >
}

export const SumLines: React.FC<SumLinesProps> = ({ selectedCats, isSearchReserved, view }) => {
    return (
        <tbody className='SumLineTBody'>
            <SumLine selectedCats={selectedCats} sumType='RECETTE' view={view} />
            <SumLine selectedCats={selectedCats} sumType='DEPENSE' view={view} />
            <SumLine selectedCats={selectedCats} sumType='TOTAL' view={view} />
            {isSearchReserved && <SumLine selectedCats={selectedCats} sumType='RESERVE' view={view} />}
        </tbody>
    )
}

const SumLine: React.FC<SumLineProps> = ({ selectedCats, sumType, view }) => {
    const { isColObj, isColAmount, isColCat, isColComment, isColDateCreate, isColDateModif, isColTemplate } = view
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
    const colspanSumLineEnd = [isColComment, isColObj && isColDateCreate, isColObj && isColDateModif, isColTemplate]
        .reduce((acc: number, isCol: boolean): number => {
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