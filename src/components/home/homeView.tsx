import React, { Component } from 'react'
import { SelectCat, SelectObj } from '../common/selectList'
import { HomeViewProps, InputObjProps, InputCatProps } from './homeView.d'
import { InputText } from '../common/inputForm'
import { handleAddObject, handleAddObjectInput, handleModifObject, handleModifObjectInput } from '../../actions/object'
import { handleAddCategory, handleAddCategoryInput, handleModifCategory } from '../../actions/category'
import { getCatById, getObjById } from '../../utils/helper'

export class HomeView extends Component<HomeViewProps, {}> {
    render() {
        const { categories, objects, objectInput, categoryInput } = this.props
        const { catId, objId } = objectInput
        return <div className='
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
                <SelectCat caller={'HOME'} catId={catId} categories={categories} />
                <SelectObj caller={'HOME'} catId={catId} objId={objId} categories={categories} objects={objects} mostUsedObjs={[]} />
            </div>
            <InputObj objects={objects} categories={categories} objectInput={objectInput} />
            <InputCat categories={categories} categoryInput={categoryInput} />
        </div>
    }
}

const InputObj: React.FC<InputObjProps> = ({ objects, categories, objectInput }) => {
    const { catId, objId } = objectInput
    const selectedCatName = getCatById(categories, catId).name
    const selectedObjName = getObjById(objects, objId).name
    const isCatOK = objectInput.catId !== -1
    const isObjOK = objectInput.objName.length > 0
    const isObjNew = objects.filter(o => o.name === objectInput.objName && o.cat.id === catId).length === 0
    const isObjSelected = objId !== -1
    const btnOK_Title = !isObjOK
        ? 'Object is missing !'
        : !isCatOK ? 'Category is missing !' :
            !isObjNew ? 'Object already exists in this category !' :
                !isObjSelected ? 'No Object selected' : ''
    const isOKBtnDisabled = !isCatOK || !isObjOK || !isObjNew || !isObjSelected
    const invalidDisableBtn = isOKBtnDisabled ? 'btnDisabled' : 'btnEnabled'
    return <div className='
             bg-indigo-100
              text-left 
              border-solid
              border-black
              border-2
              p-2
              m-1
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
                value={objectInput.objName}
                width='w-30' />
            <button
                onClick={() => {
                    handleAddObject(objectInput)
                }}
                title={btnOK_Title}
                disabled={isOKBtnDisabled}
                className={`btnAdmin btnAdminSize1 ${invalidDisableBtn}`}
            >
                AJOUT
            </button>
            <button
                onClick={() => {
                    handleModifObject(objectInput)
                }}
                title={btnOK_Title}
                disabled={isOKBtnDisabled}
                className={`btnAdmin btnAdminSize1 ${invalidDisableBtn}`}
            >
                MODIF
            </button>
        </div>
    </div>
}

const InputCat: React.FC<InputCatProps> = ({ categories, categoryInput }) => {
    const { catId, catName } = categoryInput
    const isCatOK = catName.length > 0
    const isCatSelected = catId !== -1
    const isCatNew = categories.filter(cat => cat.name === catName).length == 0
    const btnOK_Title = !isCatOK
        ? 'Category is missing !' :
        !isCatNew ? 'Category is already existed !' :
            !isCatSelected ? 'No Category selected' : ''
    const isOKBtnDisabled = !isCatOK || !isCatNew || !isCatSelected
    const invalidDisableBtn = isOKBtnDisabled ? 'btnDisabled' : 'btnEnabled'
    const selectedCatName = getCatById(categories, catId).name
    return <div className='
             bg-indigo-100
              text-left 
              border-solid
              border-black
              border-2
              w-8/12
              m-1
              p-2
              mb-5
              flex'>
        <div className='font-bold w-24'>
            Catégorie
        </div>
        <div>
            <InputText
                name={'category'}
                placeholder={'New Category'}
                value={categoryInput.catName}
                handleFC={handleAddCategoryInput}
                width='w-30'
            />
            <button
                onClick={() => {
                    handleAddCategory(categoryInput)
                }}
                title={btnOK_Title}
                disabled={isOKBtnDisabled}
                className={`btnAdmin btnAdminSize1 ${invalidDisableBtn}`}
            >
                AJOUT
            </button>
            <button
                onClick={() => {
                    handleModifCategory(categoryInput)
                }}
                title={btnOK_Title}
                disabled={isOKBtnDisabled}
                className={`btnAdmin btnAdminSize1 ${invalidDisableBtn}`}
            >
                MODIF
            </button>
        </div>
    </div>
}