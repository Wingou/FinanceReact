import React from "react"
import { handleCatIdInput, handleObjIdInput } from "../../actions/add"
import { handleModifObjIdInput } from "../../actions/modif"
import { getCatById, getObjById } from "../../utils/helper"
import { AddFormProps, SelectObjProps } from "./selectList.d"

export const SelectCat: React.FC<AddFormProps> = ({ caller, categories, addPriceInput }) => {
    const cat = categories
        .filter(c => c.template === 0 && c.id > 0 && c.position !== null)
        .sort((a, b) => a.id - b.id)
    const catById = getCatById(categories, addPriceInput.catId)
    const catNameForTitle =
        catById.id === -1 ? 'Aucune catégorie sélectionnée' : catById.name

    return (
        <select
            className='InputAdd_Select_Cat'
            value={addPriceInput.catId}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCatIdInput(e)}
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

export const SelectObj: React.FC<SelectObjProps> = ({ caller, categories, objects, catId, objId }) => {
    const objectsAll = objects
        .filter(o => o.template === 0)
        .sort((a, b) => {
            return a.name.localeCompare(b.name)
        })

    const objectsByCatId =
        catId === -1
            ? objectsAll
            : objects.filter(o => o.cat.id === catId && o.template === 0)

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

    const Red_Border_Obj = objId === -1 ? 'Red_Border' : ''

    return (
        <select
            className={`InputAdd_Select_Obj ${Red_Border_Obj}`}
            value={objId}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => caller == 'MODIF' ? handleModifObjIdInput(e) : handleObjIdInput(e)}
            title={objNameForTitle}
        >
            <option
                key={'option_objId_null'}
                value={-1}
                title='Aucun objet sélectionné'
            >
                {objLabel}
            </option>
            {objectsByCatId.map((obj_, index) => {
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
