import React, { Component, useState } from 'react'
import {
  handleAddPrice,
  handleCatIdInput,
  handleCommentInput,
  handleDateInput,
  handleObjIdInput,
  handlePriceInput
} from '../../actions/add'
import { CURRENT_DATE } from '../../constants/constants'
import { Board } from '../board/board'

export class AddView extends Component {
  render () {
    const { categories, objects, addPriceInput, filteredPrices,filteredCats} = this.props

    const cat = categories
      .filter(c => c.template === 0 && c.id > 0 && c.position !== null)
      .sort((a, b) => a.id > b.id)

    const CatList = (
      <select
        className='InputSelect'
        value={addPriceInput.catId}
        onChange={e => handleCatIdInput(e)}
      >
        <option key={'option_catId_null'} value={-1}>
          -
        </option>
        {cat.map((cat_, index) => {
          return (
            <option key={'option_catId_' + index} value={cat_.id}>
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

    const ObjList = (
      <select
        className='InputSelect'
        value={addPriceInput.objId}
        onChange={e => handleObjIdInput(e)}
      >
        {objectsByCatId.map((obj_, index) => {
          return (
            <option key={'option_objId_' + index} value={obj_.id}>
              {obj_.objName + (obj_.catName ? ' (' + obj_.catName + ')' : '')}
            </option>
          )
        })}
      </select>
    )

    return (
      <div className='addViewDiv'>
      <div className='InputAddDiv'>
        <div key={'priceDiv'} className='InputAddElement'>
          <div className='InputAddElementLabel'>Prix</div>
          <div className='InputAddElementField'>
            <input
              key={'priceInput'}
              className='PriceInput'
              type='text'
              name='price'
              defaultValue='0'
              onBlur={e => handlePriceInput(e)}
            />
          </div>
        </div>

        <div key={'dateActionDiv'} className='InputAddElement'>
          <div className='InputAddElementLabel'>Date</div>
          <div className='InputAddElementField'>
            <input
              key={'dateActionInput'}
              className='DateInput'
              type='date'
              name='dateAction'
              defaultValue={CURRENT_DATE}
              onChange={e => handleDateInput(e)}
            />
          </div>
        </div>

        <div key={'catDiv'} className='InputAddElement'>
          <div className='InputAddElementLabel'>Catégorie </div>
          <div className='InputAddElementField'>{CatList}</div>
        </div>
        <div key={'objDiv'} className='InputAddElement'>
          <div className='InputAddElementLabel'>Objet </div>
          <div className='InputAddElementField'>{ObjList}</div>
        </div>

        <div key={'commentDiv'} className='InputAddElement'>
          <div className='InputAddElementLabel'>Commentaire </div>
          <div className='InputAddElementField'>
            <input
              key={'commentInput'}
              className='CommentInput'
              type='text'
              name='comment'
              onBlur={e => handleCommentInput(e)}
            />
          </div>
        </div>

        <div key={'buttonDiv'} className='InputAddElement'>
        <div className='InputAddElementField'>
        <button
          className='ButtonOK'
          onClick={() => handleAddPrice(addPriceInput)}
        >
          OK
        </button>
        </div>
      </div>
      </div>

      <Board filteredPrices={filteredPrices} filteredCats={filteredCats} />


      </div>
      

    )
  }
}
