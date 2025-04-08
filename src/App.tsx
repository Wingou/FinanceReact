import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import './App.css'
import HomeViewContainer from './containers/homeViewContainer.js'
import { VIEW } from './constants/constants.js'
import BoardViewContainer from './containers/boardViewContainer.js'
import AddViewContainer from './containers/addViewContainer.js'
import { Menu } from './components/common/menu.js'

function App () {
  const years = useSelector(state => state.years)
  const months = useSelector(state => state.months)
  const view = useSelector(state => state.view)
  const top = useSelector(state => state.searchOptions.top)
  const [isFetchConstantReady, setIsFetchConstantReady] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    const fetchListsData = async () => {
      try {
        await fetchConstant('cat', dispatch)
        await fetchConstant('obj', dispatch)
        await fetchConstant('years', dispatch)
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
    if (view === VIEW.BOARD) {
      fetchPricesDataByDate()
    }
  }, [view, years, months, dispatch])

  useEffect(() => {
    const fetchPricesDataTop = async top_ => {
      try {
        await fetchPricesTop(top_, dispatch)
      } catch (error) {
        console.error('error fetchPricesTop : ', error)
      }
    }
    if (view === VIEW.ADD) {
      fetchPricesDataTop(top)
    }
  }, [top, view, dispatch])

  let View_
  switch (view) {
    case 'add':
      View_ = <AddViewContainer />
      break
    case 'board':
      View_ = <BoardViewContainer />
      break
    default:
      View_ = <HomeViewContainer />
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h2 className='App-title'>FINANCE REACT</h2>
        {isFetchConstantReady ? Menu : 'Loading...'}
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
      cat: 'http://localhost:3001/setCategories',
      obj: 'http://localhost:3001/setObjects',
      years: 'http://localhost:3001/setYears'
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

const fetchPricesByDate = async (years, months, dispatch) => {
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

const fetchPricesTop = async (top, dispatch) => {
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
