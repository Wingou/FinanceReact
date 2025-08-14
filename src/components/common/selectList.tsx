import React from "react"
import { handleCatIdInput, handleObjIdInput } from "../../actions/add"
import { getCatById, getObjById } from "../../utils/helper"
import { SelectCatProps, SelectObjProps } from "./selectList.d"
import { MostUsedObj } from "../../types/common"

export const SelectCat: React.FC<SelectCatProps> = ({ categories, catId, caller }) => {
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
                        {cat_.name}
                    </option>
                )
            })}
        </select>
    )
}

export const SelectObj: React.FC<SelectObjProps> = ({ caller, categories, objects, catId, objId, mostUsedObjs }) => {

    const objectsAll = objects
        .filter(o => o.template === 0)
        .sort((a, b) => {
            return a.name.localeCompare(b.name)
        })

    const objectsByCatIds =
        catId === -1
            ? objectsAll
            : objectsAll.filter(o => o.cat.id === catId && o.template === 0)

    const objById = getObjById(objects, objId)

    const objNameForTitle =
        objById.id === -1
            ? 'aucun objet sélectionné'
            : objById.name +
            (catId === -1 ? ' (' + objById.cat.name + ')' : '')

    const objLabel =
        '¤ OBJET ¤' +
        (catId === -1
            ? ''
            : ' (' + getCatById(categories, catId).name + ')')

    const Red_Border_Obj = objId === -1 ? 'invalidValue' : ''
    return (
        <select
            className={`addInput_Select ${Red_Border_Obj}`}
            value={objId}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleObjIdInput(e, caller)}
            title={objNameForTitle}
        >
            <option
                key={'option_objId_null'}
                value={-1}
                title='Aucun objet sélectionné'
            >
                {objLabel}
            </option>

            {catId === -1 && mostUsedObjs.map((muObj: MostUsedObj, index: number) => {
                return (
                    <option key={'option_mostUsedObjId_' + index} value={muObj.id.toString()} title={muObj.name}>
                        {`${muObj.name} (${muObj.cat.name})`}
                    </option>
                )
            }
            )}
            {catId === -1 && <option disabled={true} className="text-center" >¤ ¤ ¤ ¤ ¤ ¤ ¤ ¤ ¤</option>}
            {objectsByCatIds.map((obj_, index) => {
                const objName =
                    obj_.name +
                    (catId !== -1 ? '' : ' (' + obj_.cat.name + ')')

                return (
                    <option key={'option_objId_' + index} value={obj_.id.toString()} title={objName}>
                        {objName}
                    </option>
                )
            })}
        </select>
    )
}
