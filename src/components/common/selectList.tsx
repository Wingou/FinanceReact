import React, { useContext } from "react"
import { handleCatIdInput, handleObjIdInput } from "../../actions/add"
import { getCatById, getObjById, getTopObjs } from "../../utils/helper"
import { Object } from "../../types/common"
import { BoardViewContext } from "../../containers/boardViewContainer"
import { CALLER } from "../../types/constants"
import { HomeViewProps } from "../home/homeView.d"
import { BoardViewProps } from "../board/boardView.d"
import { HomeViewContext } from "../home/homeView"

export const SelectCat: React.FC<{ caller: CALLER }> = ({ caller }) => {
    const homeContext: HomeViewProps = useContext(HomeViewContext)
    const boardContext: BoardViewProps = useContext(BoardViewContext)

    const { categories, categoryInput } = caller === 'HOME'
        ? homeContext
        : boardContext
    const { catId } = categoryInput
    const cat = categories
        .filter(c => c.template === 0 && c.id > 0 && c.position !== null)
        .sort((a, b) => a.id - b.id)
    const catById = getCatById(categories, catId)
    const catNameForTitle =
        catById.id === -1 ? 'Aucune catégorie sélectionnée' : catById.name

    return (
        <select
            className='addInput_Select'
            value={catId}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCatIdInput(e, caller)}
            title={catNameForTitle}
        >
            <option
                key={'option_catId_null'}
                value={-1}
                title='Aucune catégorie sélectionnée'
            >
                ¤ CATEGORIE ¤
            </option>
            {cat.map((cat_, index) => {
                return (
                    <option
                        key={'option_catId_' + index}
                        value={cat_.id}
                        title={cat_.name}
                    >
                        {`${cat_.name} (${cat_.nbChild})`}
                    </option>
                )
            })}
        </select>
    )
}

export const SelectObj: React.FC<{ caller: CALLER }> = ({ caller }) => {
    const homeContext: HomeViewProps = useContext(HomeViewContext)
    const boardContext: BoardViewProps = useContext(BoardViewContext)

    const { categories, categoryInput, objects, objectInput } = caller === 'HOME'
        ? homeContext
        : boardContext
    const { catId, catName } = categoryInput
    const { objId } = objectInput
    const topObjs = getTopObjs(objects, 10)
    const objectsAll = objects
        .filter(o => o.template === 0)
        .sort((a, b) => {
            return a.name.localeCompare(b.name)
        })
    const isCatSelected = catId !== -1
    const objectsByCatIds =
        isCatSelected
            ? objectsAll.filter(o => o.cat.id === catId && o.template === 0)
            : objectsAll
    const objById = getObjById(objects, objId)
    const objNameForTitle =
        objById.id === -1
            ? 'aucun objet sélectionné'
            : objById.name + ' : ' + catName
    const objLabel =
        '¤ OBJET ¤' +
        (isCatSelected
            ? ' : ' + getCatById(categories, catId).name + ' '
            : '')
    const Red_Border_Obj = objId === -1 ? 'invalidValue' : ''
    return (
        <select
            className={`addInput_Select ${Red_Border_Obj}`}
            value={objId}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleObjIdInput(e)}
            title={objNameForTitle}
        >
            <option
                key={'option_objId_null'}
                value={-1}
                title='Aucun objet sélectionné'
            >
                {objLabel}
            </option>
            {!isCatSelected && topObjs.map((muObj: Object, index: number) => {
                return (
                    <option key={'option_TopObjId_' + index} value={muObj.id.toString()} title={muObj.name}>
                        {`${muObj.name} : ${muObj.cat.name} (${muObj.nbChild})`}
                    </option>
                )
            }
            )}
            {!isCatSelected && <option disabled={true} className="text-center" >¤ ¤ ¤ ¤ ¤ ¤ ¤ ¤ ¤</option>}
            {objectsByCatIds.map((obj_: Object, index: number) => {
                const objName = obj_.name + (caller === 'HOME' ? ' (' + obj_.nbChild + ')' : '')
                const objTitle = `${obj_.name} (${obj_.nbChild}) : ${obj_.cat.name}`
                return (
                    <option key={'option_objId_' + index} value={obj_.id.toString()} title={objTitle}>
                        {objName}
                    </option>
                )
            })}
        </select>
    )
}
