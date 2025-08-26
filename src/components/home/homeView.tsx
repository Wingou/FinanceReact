import React, { Component, createContext, useContext } from 'react'
import { SelectCat, SelectObj } from '../common/selectList'
import { HomeViewProps } from './homeView.d'
import { InputText } from '../common/inputForm'
import { handleAddObject, handleAddObjectInput, handleModifObject } from '../../actions/object'
import { handleAddCategory, handleAddCategoryInput, handleModifCategory } from '../../actions/category'
import { getObjById } from '../../utils/helper'
import { useSelector } from 'react-redux'
import { StateType } from '../../types/common'
import { initialCategoryInput, initialObjectInput } from '../../models/initialModel'

export const HomeViewContext = createContext<HomeViewProps>({
    categories: [],
    objects: [],
    objectInput: initialObjectInput,
    categoryInput: initialCategoryInput
})

export const HomeView: React.FC = () => {
    const props = useSelector((state: StateType) => {
        return {
            categories: state.categories,
            objects: state.objects,
            objectInput: state.objectInput,
            categoryInput: state.categoryInput
        }
    })
    return <HomeViewContext.Provider value={props}>
        <div className='
                    border-solid border-2 border-blue-500 
                    w-full  
                    flex
                    flex-col
                    items-center
                    '
        >
            <div className='
                   font-bold
                   text-xl
                   mt-5
                   mb-3
                '>
                Catégories et Objets
            </div>
            <div className='m-2'>
                <SelectCat caller='HOME' />
                <SelectObj caller='HOME' />
            </div>
            <InputCat />
            <InputObj />
        </div>
    </HomeViewContext.Provider>

}

const InputObj: React.FC = () => {

    const { categoryInput, objects, objectInput } = useContext(HomeViewContext)
    const { catId } = categoryInput
    const { objId, objName } = objectInput
    const isCatSelected = catId !== -1
    const isObjSelected = objId !== -1
    const isObjInput = objName.length > 0
    const isObjNew = objects.filter(o => o.name === objectInput.objName && o.cat.id === catId).length === 0
    const isObjOrphan = getObjById(objects, objId).nbChild === 0

    const btnAjout_Title = !isCatSelected
        ? 'Please, select a Category'
        : !isObjInput
            ? 'Object Input is missing'
            : !isObjNew
                ? 'Object already exists'
                : 'Add new Object'
    const isBtnAjout_Disabled = !isCatSelected || !isObjInput || !isObjNew
    const btnAjoutStyle = isBtnAjout_Disabled ? 'btnDisabled' : 'btnEnabled'

    const btnModif_Title = !isObjSelected
        ? 'please, select an Object to modify'
        : !isObjInput
            ? 'Object Input is missing'
            : !isObjNew
                ? 'Object already exists'
                : 'Modify Object'
    const isBtnModif_Disabled = !isObjSelected || !isObjInput || !isObjNew
    const btnModifStyle = isBtnModif_Disabled ? 'btnDisabled' : 'btnEnabled'

    const btnDel_Title = !isObjSelected
        ? 'Please, select an Object to delete'
        : isObjInput
            ? 'Object Input must be Empty '
            : !isObjOrphan
                ? 'Object has Prices, Deletion unauthorized'
                : 'Delete Object'
    const isBtnDel_Disabled = !isObjSelected || isObjInput || !isObjOrphan
    const btnDelStyle = isBtnDel_Disabled ? 'btnDisabled' : 'btnEnabled'
    const textInput = objName === 'NONE' ? '' : objName

    return <div className='
             bg-indigo-100
              text-left 
              border-solid
              border-black
              border-2
              p-2
              m-1
              mb-5
              w-8/12
              flex
              '>
        <div className='font-bold w-24'>
            Objet
        </div>
        <div>
            <InputText
                name='object'
                placeholder='New Object'
                handleFC={handleAddObjectInput}
                value={textInput}
                width='w-30' />
            <button
                onClick={() => {
                    handleAddObject(objectInput, categoryInput)
                }}
                title={btnAjout_Title}
                disabled={isBtnAjout_Disabled}
                className={`btnAdmin btnAdminSize1 ${btnAjoutStyle}`}
            >
                AJOUT
            </button>
            <button
                onClick={() => {
                    handleModifObject(objectInput, 1)
                }}
                title={btnModif_Title}
                disabled={isBtnModif_Disabled}
                className={`btnAdmin btnAdminSize1 ${btnModifStyle}`}
            >
                MODIF
            </button>
            <button
                onClick={() => {
                    handleModifObject(objectInput, 2)
                }}
                title={btnDel_Title}
                disabled={isBtnDel_Disabled}
                className={`btnAdmin btnAdminSize1 ${btnDelStyle}`}
            >
                DELETE
            </button>
        </div>
    </div>
}

const InputCat: React.FC = () => {
    const { categoryInput, categories } = useContext(HomeViewContext)
    const { catId, catName } = categoryInput
    const isCatOK = catName.length > 0
    const isCatSelected = catId !== -1
    const isCatNew = categories.filter(cat => cat.name === catName).length == 0
    const btnOK_Title = !isCatOK
        ? 'Category is missing !' :
        !isCatNew ? 'Category is already existed !' :
            !isCatSelected ? 'No Category selected' : ''
    const isAjoutBtnDisabled = !isCatOK || !isCatNew || !isCatSelected
    const btnAjoutSisableStyle = isAjoutBtnDisabled ? 'btnDisabled' : 'btnEnabled'
    const textInput = catName === 'NONE' ? '' : catName
    return <div className='
             bg-indigo-100
              text-left 
              border-solid
              border-black
              border-2
              w-8/12
              m-1
              p-2
            
              flex'>
        <div className='font-bold w-24'>
            Catégorie
        </div>
        <div>
            <InputText
                name={'category'}
                placeholder={'New Category'}
                value={textInput}
                handleFC={handleAddCategoryInput}
                width='w-30'
            />
            <button
                onClick={() => {
                    handleAddCategory(categoryInput)
                }}
                title={btnOK_Title}
                disabled={isAjoutBtnDisabled}
                className={`btnAdmin btnAdminSize1 ${btnAjoutSisableStyle}`}
            >
                AJOUT
            </button>
            <button
                onClick={() => {
                    handleModifCategory(categoryInput)
                }}
                title={btnOK_Title}
                disabled={isAjoutBtnDisabled}
                className={`btnAdmin btnAdminSize1 ${btnAjoutSisableStyle}`}
            >
                MODIF
            </button>
        </div>
    </div>
}