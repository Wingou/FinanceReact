import React, { Component } from 'react'
import { Board } from './board'
import { ActivatedCatsInput } from './categorieInput'
import { DateInput } from './datesInput'
import { SearchWordInput } from './searchInput'
import { NoBoard } from './noBoard'
import { Categorie, ModifPriceInput, Month, Object, Price, SearchOptions, Year } from '../../types/common'
import { BoardViewProps } from './boardView.d'
import { AddPriceInput } from '../add/add'

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
      categories
    } = this.props
    const {
      isMultiYears,
      isMultiMonths,
      isMultiCats,
      searchWord,
      searchMin,
      searchMax,
      isSearchDel,
      isSearchReserved,
      lastMutatedPriceId
    } = searchOptions

    const modifLineProps = {
      objects,
      modifPriceInput,
      selectedCats,
      lastMutatedPriceId
    }

    const addLineProps = {
      isAddOpen,
      addPriceInput,
      categories
    }
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
          isSearchDel={isSearchDel}
          isSearchReserved={isSearchReserved}

        />


        <DateInput
          years={years}
          months={months}
          isAllYearsChecked={isAllYearsChecked}
          isAllMonthsChecked={isAllMonthsChecked}
          isMultiYears={isMultiYears}
          isMultiMonths={isMultiMonths}
        />

        <ActivatedCatsInput
          displayedCats={displayedCats}
          isAllCatsChecked={isAllCatsChecked}
          isMultiCats={isMultiCats}
        />



        {filteredPrices.length !== 0 ? (
          <Board filteredPrices={filteredPrices} selectedCats={selectedCats} modifLineProps={modifLineProps} addLineProps={addLineProps} />
        ) : (
          <NoBoard />
        )}
      </div>
    )
  }
}
