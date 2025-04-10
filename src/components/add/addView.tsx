import React, { Component } from 'react'
import { BoardWithoutSum } from '../board/board'
import { AddForm, AddFormProps } from './add'

export class AddView extends Component<AddFormProps> {
  render () {
    const { filteredPrices, filteredCats } = this.props
    return (
      <div className='ViewAdd_Div'>
        <AddForm {...this.props} />
        <hr />
        <BoardWithoutSum
          filteredPrices={filteredPrices}
          filteredCats={filteredCats}
        />
      </div>
    )
  }
}
