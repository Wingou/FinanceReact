import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import './App.css'
import { RootState } from './store/store'
import AddViewContainer from './containers/addViewContainer'
import BoardViewContainer from './containers/boardViewContainer'
import HomeViewContainer from './containers/homeViewContainer'
import React from 'react'
import { COY, VIEW } from './constants/constants'
import { Menu } from './components/common/menu'
import { Dispatch } from '@reduxjs/toolkit'
import { Categorie, Month, Object, Year } from './types/common'

function App () {
  const years = useSelector((state:RootState) => state.years)
  const months = useSelector((state:RootState) => state.months)
  const view:VIEW = useSelector((state:RootState):VIEW => state.view as VIEW)
  const top = useSelector((state:RootState) => state.searchOptions.top)
  const [isFetchConstantReady, setIsFetchConstantReady] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    const fetchListsData = async () => {
      try {
        await fetchConstant('CAT', dispatch)
        await fetchConstant('OBJ', dispatch)
        await fetchConstant('YEARS', dispatch)
        setIsFetchConstantReady(true)
      } catch (error) {
        console.error('error fetchListsData : ', error)
      }
    }
    fetchListsData()
  }, [dispatch])

  useEffect(() => {
    const fetchPricesDataByDate = async () => {
      try {
        await fetchPricesByDate(years, months, dispatch)
      } catch (error) {
        console.error('error fetchPricesByDate : ', error)
      }
    }
    if (view === 'BOARD') {
      fetchPricesDataByDate()
    }
  }, [view, years, months, dispatch])

  useEffect(() => {
    const fetchPricesDataTop = async (top_:number) => {
      try {
        await fetchPricesTop(top_, dispatch)
      } catch (error) {
        console.error('error fetchPricesTop : ', error)
      }
    }
    if (view === 'ADD') {
      fetchPricesDataTop(top)
    }
  }, [top, view, dispatch])

  const viewContainer = ()=> {
  switch (view) {
    case 'ADD':
      return <AddViewContainer />;
      
    case 'BOARD':
      return<BoardViewContainer />;
      
    case 'HOME':
      return <HomeViewContainer />;
    default:
      throw new Error('Switch VIEW Error !')
  }}

  

  return (
    <div className='App'>
      <header className='App-header'>
        <h2 className='App-title'>FINANCE REACT</h2>
        {isFetchConstantReady ? Menu : 'Loading...'}
      </header>
      {viewContainer()}
      <footer>
        <div className='App-footer'>- FINANCE REACT - March 2025 -</div>
      </footer>
    </div>
  )
}

export default App

interface ApiCat {
  cat : Categorie[]
}

interface ApiObj  {
  obj : Object[]
}

interface ApiYears  {
  years : number[]
}

type ApiConstant = ApiCat  | ApiObj | ApiYears 


const fetchConstant = async (constant:COY, dispatch:Dispatch) => {
  try {
    const api:string = {
      'CAT': 'http://localhost:3001/setCategories',
      'OBJ': 'http://localhost:3001/setObjects',
      'YEARS': 'http://localhost:3001/setYears'
    }[constant]

    const param = (rs:ApiConstant) => {
      switch (constant) {
      case 'CAT' : 
            return {
        
          type: 'SET_CATEGORIES',
          payload: {
            categories: (rs as ApiCat).cat
        
        }};
        
        case 'OBJ' : 
        return {
          type: 'SET_OBJECTS',
          payload: {
            objects: (rs as ApiObj).obj
        
        }
      };
        case 'YEARS' : 
        return {
          type: 'SET_YEARS',

          payload: {
            years: (rs as ApiYears).years
          }};

        default :
            throw new Error(`Constant "${constant}" non reconnu.`)
      }
      
    }
    const resp = await fetch(api)
    const rs = await resp.json()
    dispatch(param(rs))
    return rs
  } catch (error) {
    console.error('error get ' + constant, error)
    throw error
  }
}

const fetchPricesByDate = async (years:Year[], months:Month[], dispatch:Dispatch) => {
  try {
    const filteredYears = years.filter(y => y.filtered).map(y => y.year)
    const filteredMonths = months.filter(m => m.filtered).map(m => m.month)
    const apiPrices = `http://localhost:3001/pricesByDates?years=${filteredYears}&months=${filteredMonths}`
    const respPrices = await fetch(apiPrices)
    const rsPrices = await respPrices.json()
    dispatch({
      type: 'SET_PRICES',
      payload: {
        prices: rsPrices.prices
      }
    })
  } catch (error) {
    console.error('error pricesByDates :', error)
  }
}

const fetchPricesTop = async (top:number, dispatch:Dispatch) => {
  try {
    const apiPrices = `http://localhost:3001/pricesTop?top=${top}`
    const respPrices = await fetch(apiPrices)
    const rsPrices = await respPrices.json()
    dispatch({
      type: 'SET_PRICES',
      payload: {
        prices: rsPrices.prices
      }
    })
  } catch (error) {
    console.error('error pricesTop :', error)
  }
}
