import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import './App.css'
import { RootState } from './store/store'
import AddViewContainer from './containers/addViewContainer'
import BoardViewContainer from './containers/boardViewContainer'
import HomeViewContainer from './containers/homeViewContainer'
import React from 'react'
import { COY } from './constants/constants'
import { Menu } from './components/common/menu'
import { Dispatch } from '@reduxjs/toolkit'
import { Month, Year } from './types/common'

function App() {
  const dispatch = useDispatch()
  const years = useSelector((state: RootState) => state.years)
  const months = useSelector((state: RootState) => state.months)
  const view = useSelector((state: RootState) => state.view)
  const [isCOYLoaded, setIsCOYLoaded] = useState(false)

  useEffect(() => {
    const fetchListsData = async () => {
      try {
        await fetchList('CAT', dispatch)
        await fetchList('OBJ', dispatch)
        await fetchList('YEARS', dispatch)
        setIsCOYLoaded(true)
      } catch (error) {
        console.error('ERROR: fetchListsData : ', error)
      }
    }
    fetchListsData()
  }, [dispatch])

  useEffect(() => {
    const fetchPricesData = async () => {
      try {
        await fetchPrices(years, months, dispatch)
      } catch (error) {
        console.error('ERROR: fetchPrices', error)
      }
    }
    if (view.page === 'BOARD') {
      fetchPricesData()
    }
  }, [view, years, months, dispatch])


  const viewContainer = () => {
    switch (view.page) {
      case 'BOARD':
        return <BoardViewContainer />;
      case 'HOME':
        return <HomeViewContainer />;
      default:
        throw new Error('Switch PAGE Error !')
    }
  }

  const viewAddContainer = () => {
      if (view.isAddOpen) {return <AddViewContainer />; }
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h2 className='App-title'>FINANCE REACT</h2>
        {isCOYLoaded ? Menu : 'Loading...'}
      </header>
      {viewAddContainer()}
      {viewContainer()}
      <footer>
        <div className='App-footer'>- FINANCE REACT - March 2025 -</div>
      </footer>
    </div>
  )
}
export default App

const fetchList = async (coy_: COY, dispatch: Dispatch) => {
  try {
    const coy = {
      'CAT': { api: 'http://localhost:3001/setCategories', type: 'SET_CATEGORIES' },
      'OBJ': { api: 'http://localhost:3001/setObjects', type: 'SET_OBJECTS' },
      'YEARS': { api: 'http://localhost:3001/setYears', type: 'SET_YEARS' }
    }[coy_]
    const resp = await fetch(coy.api)
    const rs = await resp.json()
    dispatch({
      type: coy.type,
      payload: rs
    }
    )
  } catch (error) {
    console.error('ERROR: fetchSimpleList ' + coy_, error)
    throw error
  }
}

const fetchPrices = async (years: Year[], months: Month[], dispatch: Dispatch) => {
  try {
    const filteredYears = years.filter(y => y.isOn).map(y => y.year)
    const filteredMonths = months.filter(m => m.isOn).map(m => m.month)
    const api = `http://localhost:3001/pricesByDates?years=${filteredYears}&months=${filteredMonths}`
    const resp = await fetch(api)
    const rsPrices = await resp.json()
    dispatch({
      type: 'SET_PRICES',
      payload: rsPrices
    })
  } catch (error) {
    console.error('ERROR: fetchPrices', error)
  }
}
