import React, { Component } from 'react'
import { SelectCat, SelectObj } from '../common/selectList'
import { HomeViewProps, InputObjProps, InputCatProps } from './homeView.d'
import { InputText } from '../common/inputForm'
import { handleAddObject, handleAddObjectInput, handleModifObject, handleModifObjectInput } from '../../actions/object'
import { handleAddCategory, handleAddCategoryInput } from '../../actions/category'

export class HomeView extends Component<HomeViewProps, {}> {
    render() {
        const { categories, objects, objectInput, categoryInput } = this.props
        const { catId, objId } = objectInput
        return <div>Welcome to the Finance React App !<br />
            <SelectCat caller={'HOME'} catId={catId} categories={categories} />
            <SelectObj caller={'HOME'} catId={catId} objId={objId} categories={categories} objects={objects} mostUsedObjs={[]} />
            <hr />
            <InputObj objects={objects} categories={categories} objectInput={objectInput} />
            <hr />
            <InputCat categories={categories} categoryInput={categoryInput} />
        </div>
    }
}

const InputObj: React.FC<InputObjProps> = ({ objects, categories, objectInput }) => {
    const { catId, objId } = objectInput
    const isCatOK = objectInput.catId !== -1
    const isObjOK = objectInput.objName.length > 0
    const isObjNew = objects.filter(o => o.name === objectInput.objName && o.cat.id === catId).length === 0
    const btnOK_Title = !isObjOK
        ? 'Object is missing !'
        : !isCatOK ? 'Category is missing !' :
            !isObjNew ? 'Object already exists in this category !' : ''
    const isOKBtnDisabled = !(isObjOK && isCatOK && isObjNew)
    const invalidDisableBtn = !isCatOK || !isObjOK || !isObjNew ? 'btnDisabled' : 'btnEnabled'
    return <div>
        Add  <InputText
            name='object'
            placeholder='New Object'
            handleFC={handleAddObjectInput}
            value={objectInput.objName}
            width='w-60' />
        in  <SelectCat caller={'HOME'} catId={catId} categories={categories} />
        <button
            onClick={() => {
                handleAddObject(objectInput)
            }}
            title={btnOK_Title}
            disabled={isOKBtnDisabled}
            className={`btnAdmin btnAdminSize0 ${invalidDisableBtn}`}
        >
            OK
        </button>
        <br />
        Modify  <SelectObj caller={'HOME'} catId={catId} objId={objId} categories={categories} objects={objects} mostUsedObjs={[]} />
        to  <InputText
            name='object'
            placeholder='New Object Name'
            handleFC={handleAddObjectInput}
            value={objectInput.objName}
            width='w-60' />
        <button
            onClick={() => {
                handleModifObject(objectInput)
            }}
            title={btnOK_Title}
            disabled={isOKBtnDisabled}
            className={`btnAdmin btnAdminSize0 ${invalidDisableBtn}`}
        >
            OK
        </button>
    </div>
}

const InputCat: React.FC<InputCatProps> = ({ categories, categoryInput }) => {
    const { catName } = categoryInput
    const isCatOK = catName.length > 0
    const isCatNew = categories.filter(cat => cat.name === catName).length == 0
    const btnOK_Title = !isCatOK
        ? 'Category is missing !' :
        !isCatNew ? 'Category is already existed !' : ''
    const isOKBtnDisabled = !isCatOK || !isCatNew
    const invalidDisableBtn = !isCatOK || !isCatNew ? 'btnDisabled' : 'btnEnabled'
    return <div>
        Add <InputText
            name={'category'}
            placeholder={'New Category'}
            value={categoryInput.catName}
            handleFC={handleAddCategoryInput}
        />
        <button
            onClick={() => {
                handleAddCategory(categoryInput)
            }}
            title={btnOK_Title}
            disabled={isOKBtnDisabled}
            className={`btnAdmin btnAdminSize0 ${invalidDisableBtn}`}
        >
            OK
        </button>
    </div>
}