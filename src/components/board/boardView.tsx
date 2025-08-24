import React, { Component } from 'react'
import { Board } from './board'
import { ActivatedCatsInput } from '../inputs/categorieInput'
import { DateInput } from '../inputs/datesInput'
import { SearchWordInput } from '../inputs/searchInput'
import { NoBoard } from './noBoard'
import { BoardViewProps } from './boardView.d'
import { AddPriceInput } from '../add/add'
import { OrderInput } from '../inputs/orderInput'
import { ColumnInput } from '../inputs/columnInput'
import { GroupByInput } from '../inputs/rowInput'
import { BoardViewContext } from '../../containers/boardViewContainer'

export class BoardView extends Component<BoardViewProps, {}> {
  render() {
    const { filteredPrices, isAddOpen } = this.props
    const isPricesFound = filteredPrices.length !== 0
    return (
      <BoardViewContext.Provider value={this.props}>
        <div>
          {isAddOpen && <AddPriceInput />}
          <SearchWordInput isPricesFound={isPricesFound} />
          <DateInput />
          <ActivatedCatsInput />
          <ColumnInput isPricesFound={isPricesFound} />
          <GroupByInput isPricesFound={isPricesFound} />
          <OrderInput />
          {filteredPrices.length !== 0 ? (
            <Board />
          ) : (
            <NoBoard />
          )}
        </div>
      </BoardViewContext.Provider>
    )
  }
}
