import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import './App.css'
import BoardViewContainer from './containers/boardViewContainer'

function App () {
  const years = useSelector(state => state.years)
  const months = useSelector(state => state.months)
  const dispatch = useDispatch()
  const [isListsSet, setLists] = useState(false)

  useEffect(() => {
    const fetchListsData = async () => {
      try {
        await fetchObj(dispatch)
        await fetchCat(dispatch)
        await fetchYears(dispatch)
        setLists(true)
      } catch (error) {
        console.error('error fetchListsData : ', error)
      }
    }
    fetchListsData()
  }, [dispatch])

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

  return (
    <div className='App'>
      <header className='App-header'>
        <h3 className='App-title'>FINANCE REACT</h3>
      </header>
      <BoardViewContainer />
      <footer>
        <div className='App-footer'>- FINANCE REACT - March 2025 -</div>
      </footer>
    </div>
  )
}

export default App

const fetchCat = async dispatch => {
  try {
    const apiCat = `http://localhost:3001/getCategories`
    const respCat = await fetch(apiCat)
    const rsCat = await respCat.json()
    dispatch({
      type: 'SET_CATEGORIES',
      payload: {
        categories: rsCat.cat
      }
    })
    return rsCat
  } catch (error) {
    console.error('error getCategories :', error)
    throw error
  }
}

const fetchObj = async dispatch => {
  try {
    const apiObj = `http://localhost:3001/getObjects`
    const respObj = await fetch(apiObj)
    const rsObj = await respObj.json()
    dispatch({
      type: 'SET_OBJECTS',
      payload: {
        objects: rsObj.obj
      }
    })
    return rsObj
  } catch (error) {
    console.error('error getObjects :', error)
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

const fetchYears = async dispatch => {
  try {
    const apiYears = `http://localhost:3001/getYears`
    const respYears = await fetch(apiYears)
    const rsYears = await respYears.json()
    dispatch({
      type: 'SET_YEARS',
      payload: {
        years: rsYears.years
      }
    })
    return rsYears
  } catch (error) {
    console.error('error getYears :', error)
    throw error
  }
}
