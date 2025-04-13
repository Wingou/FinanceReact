import React, { Component } from 'react'
import { AddForm, AddFormProps } from './add'

export class AddView extends Component<AddFormProps> {
  render () {
    return (
      <div className='ViewAdd_Div'>
        <AddForm {...this.props} />
        <hr />
      </div>
    )
  }
}
