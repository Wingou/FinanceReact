import React, { Component } from 'react'
import { BoardWithoutSum } from '../board/board'
import { AddForm } from './add'

export class AddView extends Component {
  render () {
    const { filteredPrices, filteredCats } = this.props
    return (
      <div className='ViewAdd_Div'>
        <AddForm props={this.props} />
        <hr />
        <BoardWithoutSum
          filteredPrices={filteredPrices}
          filteredCats={filteredCats}
        />
      </div>
    )
  }
}
