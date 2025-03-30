import React, { Component, useState } from 'react'
import { handleCatIdInput } from '../../actions/add'



export class AddView extends Component {


 

    render () {



    const {categories, objects} = this.props

        const cat = categories
                .filter((c)=> c.template===0 && c.id>0)
                .sort((a,b)=>a.catName.localeCompare(b.catName))

 
        

    const CatList = <select onChange={(e)=>handleCatIdInput(e)}>
                    {cat.map(

                     (cat_, index)=>{ return  <option key={'option_'+index} value={cat_.id}>{cat_.catName}</option>
                }
        )
                    

    }
    </select>

    console.log(CatList)


    return     <div className='InputDiv'>


        {CatList} 
      <label key={'priceLabel'} className='InputLabel'>
      Prix
        <input
          key={'priceInput'}
          className='TextInput'
          type='text'
          name='price'
          defaultValue='0'
          onChange={e => {   }}
        />
      </label>

      <label key={'dateActionLabel'} className='InputLabel'>
      Date
        <input
          key={'dateActionInput'}
          className='TextInput'
          type='text'
          name='dateAction'
          defaultValue='0'
          onChange={e => {   }}
        />
      </label>

      <label key={'categoryLabel'} className='InputLabel'>
      Catégorie
        <input
          key={'categoryInput'}
          className='TextInput'
          type='text'
          name='category'
          defaultValue='0'
          onChange={e => {   }}
        />
      </label>
      <label key={'objectLabel'} className='InputLabel'>
      Objet
        <input
          key={'objectInput'}
          className='TextInput'
          type='text'
          name='object'
          defaultValue='0'
          onChange={e => {   }}
        />
      </label>
      <label key={'commentLabel'} className='InputLabel'>
      Prix
        <input
          key={'commentInput'}
          className='TextInput'
          type='text'
          name='comment'
          defaultValue='0'
          onChange={e => {   }}
        />
      </label>
            </div>
        }
    }