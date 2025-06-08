import React, { Component } from 'react'
import { SelectCat, SelectObj } from '../common/selectList'
import { HomeViewProps, InputObjProps } from './homeView.d'
import { InputText } from '../common/inputForm'
import { handleAddObject, handleAddObjectInput } from '../../actions/object'

export class HomeView extends Component<HomeViewProps, {}> {
    render() {
        const { categories, objects, addObjectInput } = this.props
        const { catId } = addObjectInput
        return <div>Welcome to the Finance React App !<br />
            Build with React, TypeScript, GraphQL and Apollo Client.
            <br />
            Node.JS and Express for the backend.
            <hr />
            <InputObj objects={objects} categories={categories} addObjectInput={addObjectInput} />
        </div>
    }
}

const InputObj: React.FC<InputObjProps> = ({ objects, categories, addObjectInput }) => {
    const { catId, objId } = addObjectInput
    const isCatOK = addObjectInput.catId !== -1
    const isObjOK = addObjectInput.objName.length > 0
    const isObjExist = objects.filter(o => o.name === addObjectInput.objName && o.cat.id === catId).length === 0
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
        ADD <InputText
            name='object'
            placeholder='New Object'
            handleFC={handleAddObjectInput}
            value={addObjectInput.objName}
            width='w-60' />
        in
        <SelectCat caller={'HOME'} catId={catId} categories={categories} />
        <button
            onClick={() => {
                handleAddObject(addObjectInput)
            }}
            title={btnOK_Title}
            disabled={isOKBtnDisabled}
            className={`btnAdmin btnAdminSize0 ${invalidDisableBtn}`}
        >
            OK
        </button>
    </div>
}
