import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import './App.css'
import HomeViewContainer from './containers/homeViewContainer.js'
import {VIEW} from './constants/constants.js'
import BoardViewContainer from './containers/boardViewContainer.js'
import AddViewContainer from './containers/addViewContainer.js'
import { Menu } from './components/common/menu.js'

function App () {
  const years = useSelector(state => state.years)
  const months = useSelector(state => state.months)
  const view = useSelector(state => state.view)
  const dispatch = useDispatch()
  const [isListsSet, setLists] = useState(false)

  useEffect(() => {
    const fetchListsData = async () => {
      try {
        await fetchConstant('obj', dispatch)
        await fetchConstant('cat', dispatch)
        await fetchConstant('years',dispatch)
        setLists(true)
      } catch (error) {
        console.error('error fetchListsData : ', error)
      }
    }
    if (view===VIEW.BOARD) {
      fetchListsData()}
  }, [view, dispatch])

  useEffect(() => {
    const fetchPricesData = async () => {
      try {
        await fetchPrices(years, months, dispatch)
      } catch (error) {
        console.error('error fetchPrices : ', error)
      }
    }
    if (isListsSet) {
      fetchPricesData()
    }
  }, [isListsSet, years, months, dispatch])



    let View_
    switch (view) {
              case 'add':  View_ = <AddViewContainer />
                break;
              case 'board':  View_ = <BoardViewContainer />
              break;
              default :  View_ = <HomeViewContainer />
              
        }



  return (
    <div className='App'>
      <header className='App-header'>
        <h2 className='App-title'>FINANCE REACT</h2>
        { Menu }
      </header>
      
      {View_}
      
      <footer>
        <div className='App-footer'>- FINANCE REACT - March 2025 -</div>
      </footer>
    </div>
  )
}

export default App

const fetchConstant = async (constant, dispatch) => {
  try {
    const api = {
      cat: 'http://localhost:3001/getCategories',
      obj: 'http://localhost:3001/getObjects',
      years: 'http://localhost:3001/getYears'
    }[constant]

    const param = rs => {
      return {
        cat: {
          type: 'SET_CATEGORIES',
          payload: {
            categories: rs.cat
          }
        },
        obj: {
          type: 'SET_OBJECTS',
          payload: {
            objects: rs.obj
          }
        },
        years: {
          type: 'SET_YEARS',
          payload: {
            years: rs.years
          }
        }
      }[constant]
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

const fetchPrices = async (years, months, dispatch) => {
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
