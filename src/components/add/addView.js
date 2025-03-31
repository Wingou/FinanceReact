import React, { Component, useState } from 'react'
import { handleAddPrice, handleCatIdInput, handleCommentInput, handleDateInput, handleObjIdInput, handlePriceInput } from '../../actions/add'
import { CURRENT_DATE } from '../../constants/constants'

export class AddView extends Component {
  render () {
    const { categories, objects, addPriceInput } = this.props

    const cat = categories
      .filter(c => c.template === 0 && c.id > 0 && c.position !== null)
      .sort((a, b) => a.id > b.id)

    const CatList = (
      <select value={addPriceInput.catId} onChange={e => handleCatIdInput(e)}>
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
      <select value={addPriceInput.objId} onChange={e => handleObjIdInput(e)}>
        {objectsByCatId.map((obj_, index) => {
          return (
            <option key={'option_objId_' + index} value={obj_.id} >
              {obj_.objName + (obj_.catName ? ' (' + obj_.catName + ')' : '')}
            </option>
          )
        })}
      </select>
    )

    return (
      <div className='InputDiv'>
        <label key={'catLabel'} className='InputLabel'>
          Catégorie {CatList}
        </label>
        <label key={'objLabel'} className='InputLabel'>
          Objet {ObjList}
        </label>
        
        <label key={'priceLabel'} className='InputLabel'>
          Prix
          <input
            key={'priceInput'}
            className='TextInput'
            type='text'
            name='price'
            defaultValue='0'
            onBlur ={e =>handlePriceInput(e)}
          />
        </label>

        <label key={'dateActionLabel'} className='InputLabel'>
          Date 
          <input
            key={'dateActionInput'}
            className='TextInput'
            type='date'
            name='dateAction'
            defaultValue={CURRENT_DATE}
            onChange={e =>handleDateInput(e)}
          />
        </label>

        <label key={'commentLabel'} className='InputLabel'>
          Commentaire 
          <input
            key={'commentInput'}
            className='TextInput'
            type='text'
            name='comment'
            onBlur ={e => handleCommentInput(e)}
          />
        </label>

        <button onClick={()=>handleAddPrice(addPriceInput)}>Ajouter</button>

      </div>
    )
  }
}
