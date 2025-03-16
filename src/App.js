import { useDispatch, useSelector } from 'react-redux'
import SearchMenu from './containers/searchMenuContainer'
import { useEffect } from 'react'

function App () {
  const selectedYear = useSelector(state => state.selectedYear)
  const selectedMonth = useSelector(state => state.selectedMonth)
  // const categories = useSelector(state => state.categories)
  const dispatch = useDispatch()

  useEffect(() => {
    try {
      const fetchPrices = async () => {
        const apiPrices = `http://localhost:3001/pricesByMonthYear?year=${selectedYear}&month=${selectedMonth}`

        await fetch(apiPrices)
          .then(respPrices => {
            console.log('respPrices :', respPrices)
            const b = respPrices.json()
            return b
          })
          .then(rsPrices => {
            console.log('rsPrices : ', rsPrices)
            console.log('rsCat complet:', JSON.stringify(rsPrices, null, 2))
            const a = dispatch({
              type: 'SET_DATA',
              payload: {
                prices: rsPrices.prices
              }
            })

            return a
          })
      }
      fetchPrices()
    } catch (error) {
      console.log('error getCategories : ', error)
    }
  }, [selectedYear, selectedMonth, dispatch])

  useEffect(() => {
    try {
      const setCat = async () => {
        const apiCat = `http://localhost:3001/getCategories`

        await fetch(apiCat)
          .then(respCat => respCat.json())
          .then(rsCat => {
            console.log('rsCategories : ', rsCat)
            console.log('rsCat complet:', JSON.stringify(rsCat, null, 2))
            const c = dispatch({
              type: 'SET_CATEGORIES',
              payload: {
                categories: rsCat.cat
              }
            })

            return c
          })
      }

      setCat()
    } catch (error) {
      console.log('error getCategories : ', error)
    }
  }, [])

  useEffect(() => {
    try {
      const setObj = async () => {
        const apiObj = `http://localhost:3001/getObjects`

        await fetch(apiObj)
          .then(respObj => respObj.json())
          .then(rsObj =>
            dispatch({
              type: 'SET_OBJECTS',
              payload: {
                objects: rsObj.obj
              }
            })
          )
      }

      setObj()
    } catch (error) {
      console.log('error getObjects : ', error)
    }
  }, [])

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
