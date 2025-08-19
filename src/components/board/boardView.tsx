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

export class BoardView extends Component<BoardViewProps, {}> {
  render() {
    const {
      years,
      months,
      filteredPrices,
      displayedCats,
      selectedCats,
      isAllYearsChecked,
      isAllMonthsChecked,
      isAllCatsChecked,
      searchOptions,
      objects,
      modifPriceInput,
      addPriceInput,
      isAddOpen,
      categories,
      isLast,
      orderOptions,
      view,
      nbObjPerCats
    } = this.props
    const {
      isMultiYears,
      isMultiMonths,
      isMultiCats,
      searchWord,
      searchMin,
      searchMax,
      isSearchDeleted,
      isSearchReserved,
      lastMutatedPriceId
    } = searchOptions

    const addLineProps = {
      isAddOpen,
      addPriceInput,
      categories
    }

    const isPricesFound = filteredPrices.length !== 0
    return (
      <div>
        {isAddOpen
          && <AddPriceInput
            addPriceInput={addPriceInput}
            caller={'ADD'}
            categories={categories}
            objects={objects}
          />
        }
        <SearchWordInput
          searchWord={searchWord}
          searchMin={searchMin}
          searchMax={searchMax}
          isPricesFound={isPricesFound}
        />
        <DateInput
          years={years}
          months={months}
          isAllYearsChecked={isAllYearsChecked}
          isAllMonthsChecked={isAllMonthsChecked}
          isMultiYears={isMultiYears}
          isMultiMonths={isMultiMonths}
          isLast={isLast}
        />
        <ActivatedCatsInput
          displayedCats={displayedCats}
          isAllCatsChecked={isAllCatsChecked}
          isMultiCats={isMultiCats}
          nbObjPerCats={nbObjPerCats}
          isSearchReserved={isSearchReserved}
          isSearchDeleted={isSearchDeleted}

        />
        <ColumnInput
          searchWord={searchWord}
          isSearchDeleted={isSearchDeleted}
          isSearchReserved={isSearchReserved}
          view={view}
          isPricesFound={isPricesFound}
        />
        <GroupByInput
          searchWord={searchWord}
          isSearchDeleted={isSearchDeleted}
          isSearchReserved={isSearchReserved}
          view={view}
          isPricesFound={isPricesFound}
        />
        <OrderInput orderOptions={orderOptions} />
        {filteredPrices.length !== 0 ? (
          <Board
            filteredPrices={filteredPrices}
            selectedCats={selectedCats}
            modifPriceInput={modifPriceInput}
            objects={objects}
            lastMutatedPriceId={lastMutatedPriceId}
            addLineProps={addLineProps}
            isSearchReserved={isSearchReserved}
            view={view}
          />
        ) : (
          <NoBoard />
        )}
      </div>
    )
  }
}
