import React, { Component } from 'react'
import {
  handleAddPrice,
  handleCatIdInput,
  handleCommentInput,
  handleDateInput,
  handleObjIdInput,
  handlePriceInput
} from '../../actions/add'
import { CURRENT_DATE } from '../../constants/constants'
import { BoardWithoutSum } from '../board/board'
import { getCatById, getObjById } from '../../utils/helper'

export class AddView extends Component {
  render () {
    const { categories, objects, addPriceInput, filteredPrices, filteredCats } =
      this.props

    const cat = categories
      .filter(c => c.template === 0 && c.id > 0 && c.position !== null)
      .sort((a, b) => a.id > b.id)

    const catById = getCatById(categories, addPriceInput.catId)
    const catNameForTitle =
      catById.id === -1 ? 'Aucune catégorie sélectionnée' : catById.catName

    const CatList = (
      <select
        className='InputAdd_Select_Cat'
        value={addPriceInput.catId}
        onChange={e => handleCatIdInput(e)}
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
              title={cat_.catName}
            >
              {cat_.catName}
            </option>
          )
        })}
      </select>
    )

    const objectsAll = objects
      .filter(o => o.template === 0)
      .map(o => {
        return {
          ...o,
          catName: categories.find(c => c.id === o.catId).catName
        }
      })
      .sort((a, b) => {
        return a.objName.localeCompare(b.objName)
      })

    const objectsByCatId =
      addPriceInput.catId === -1
        ? objectsAll
        : objects.filter(
            o => o.catId === addPriceInput.catId && o.template === 0
          )

    const objById = getObjById(objects, addPriceInput.objId)
    const objNameForTitle =
      objById.id === -1 ? 'aucun objet sélectionné' : objById.objName

    const ObjList = (
      <select
        className='InputAdd_Select_Obj'
        value={addPriceInput.objId}
        onChange={e => handleObjIdInput(e)}
        title={objNameForTitle}
      >
        <option
          key={'option_objId_null'}
          value={-1}
          title='Aucun objet sélectionné'
        >
          ¤ OBJET ¤
        </option>
        {objectsByCatId.map((obj_, index) => {
          const objName =
            obj_.objName + (obj_.catName ? ' (' + obj_.catName + ')' : '')
          return (
            <option
              key={'option_objId_' + index}
              value={obj_.id}
              title={objName}
            >
              {objName}
            </option>
          )
        })}
      </select>
    )

    const buttonOKDisabled = addPriceInput.objId === -1
    const buttonOKTitle = buttonOKDisabled ? 'Objet manquant !' : 'Valider'

    return (
      <div className='ViewAdd_Div'>
        <div className='InputAdd_Form'>
          <div key={'Col1'} className='InputAdd_Col1'>
            <input
              key={'Input_Date'}
              className='InputAdd_Input_Date'
              type='date'
              name='dateAction'
              defaultValue={CURRENT_DATE}
              onChange={e => handleDateInput(e)}
            />

            {CatList}

            {ObjList}
          </div>

          <div key={'Col2'} className='InputAdd_Col2'>
            <div key={'Col2_row1'} className='InputAdd_Col2_row1'>
              <input
                key={'Input_Price'}
                className='InputAdd_Input_Price'
                type='text'
                name='price'
                placeholder='15.50'
                defaultValue={addPriceInput.priceValue}
                onBlur={e => handlePriceInput(e)}
              />
            </div>
            <div key={'Col2_row2'} className='InputAdd_Col2_row2'>
              <input
                key={'Input_Comment'}
                className='InputAdd_Input_Comment'
                type='text'
                name='comment'
                placeholder='Saisir un commentaire ici...'
                onBlur={e => handleCommentInput(e)}
              />
            </div>
            <div key={'Col2_row3'} className='InputAdd_Col2_row3'>
              <button
                className='InputAdd_Button_OK'
                onClick={() => handleAddPrice(addPriceInput)}
                disabled={buttonOKDisabled}
                title={buttonOKTitle}
              >
                OK
              </button>
            </div>
          </div>
        </div>
        <hr />
        <BoardWithoutSum
          filteredPrices={filteredPrices}
          filteredCats={filteredCats}
        />
      </div>
    )
  }
}
