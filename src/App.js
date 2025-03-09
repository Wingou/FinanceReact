import { useDispatch, useSelector } from 'react-redux'
import SearchMenu from './containers/searchMenuContainer'
import { useEffect } from 'react'

function App () {
  const selectedYear = useSelector(state => state.selectedYear)
  const selectedMonth = useSelector(state => state.selectedMonth)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `http://localhost:3001/pricesByMonthYear?year=${selectedYear}&month=${selectedMonth}`
      const response = await fetch(apiUrl)
      const data = await response.json()
      dispatch({
        type: 'SET_DATA',
        payload: {
          prices: data.prices,
          selectedYear: data.selectedYear,
          selectedMonth: data.selectedMonth
        }
      })
    }
    fetchData()
  }, [selectedYear, selectedMonth, dispatch])

  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='App-title'>FINANCE REACT</h1>
      </header>
      <SearchMenu />
    </div>
  )
}

export default App
