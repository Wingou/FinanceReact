import React, { Component } from 'react'
import { SelectCat, SelectObj } from '../common/selectList'
import { HomeViewProps, InputObjProps } from './homeView.d'
import { InputText } from '../common/inputForm'
import { handleAddObject, handleAddObjectInput, handleModifObject, handleModifObjectInput } from '../../actions/object'

export class HomeView extends Component<HomeViewProps, {}> {
    render() {
        const { categories, objects, objectInput } = this.props
        return <div>Welcome to the Finance React App !<br />
            Build with React, TypeScript, GraphQL and Apollo Client.
            <br />
            Node.JS and Express for the backend.
            <hr />
            <InputObj objects={objects} categories={categories} objectInput={objectInput} />
        </div>
    }
}

const InputObj: React.FC<InputObjProps> = ({ objects, categories, objectInput }) => {
    const { catId, objId } = objectInput
    const isCatOK = objectInput.catId !== -1
    const isObjOK = objectInput.objName.length > 0
    const isObjExist = objects.filter(o => o.name === objectInput.objName && o.cat.id === catId).length === 0
    const btnOK_Title = !isObjOK
        ? 'Object is missing !'
        : !isCatOK ? 'Category is missing !' :
            !isObjExist ? 'Object already exists in this cateory !' : ''
    const isOKBtnDisabled = !(isObjOK && isCatOK && isObjExist)
    const invalidDisableBtn = !isCatOK || !isObjOK || !isObjExist ? 'btnDisabled' : 'btnEnabled'
    return <div>
        <SelectCat caller={'HOME'} catId={catId} categories={categories} />
        <SelectObj caller={'HOME'} catId={catId} objId={objId} categories={categories} objects={objects} mostUsedObjs={[]} />
        <hr />
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
