import React, { Component } from 'react'
import { AddForm } from './add'
import { AddFormProps } from '../common/selectList.d'

export class AddView extends Component<AddFormProps> {
  render() {
    return (
      <div className='ViewAdd_Div'>
        <AddForm {...this.props} />
        <hr />
      </div>
    )
  }
}
