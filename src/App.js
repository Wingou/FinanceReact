import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import './App.css'
import BoardViewContainer from './containers/boardViewContainer'

function App () {
  const selectedYear = useSelector(state => state.selectedYear)
  const selectedMonth = useSelector(state => state.selectedMonth)
  const dispatch = useDispatch()

  useEffect(() => {
    try {
      const fetchPrices = async () => {
        const apiPrices = `http://localhost:3001/pricesByMonthYear?year=${selectedYear}&month=${selectedMonth}`
        await fetch(apiPrices)
          .then(respPrices => {
            return respPrices.json()
          })
          .then(rsPrices => {
            return dispatch({
              type: 'SET_PRICES',
              payload: {
                prices: rsPrices.prices
              }
            })
          })
      }
      fetchPrices()
    } catch (error) {
      console.log('error getCategories : ', error)
    }
  }, [selectedYear, selectedMonth, dispatch])

  // useEffect(() => {
  //   try {
  //     const setCat = async () => {
  //       const apiCat = `http://localhost:3001/getCategories`

  //       await fetch(apiCat)
  //         .then(respCat => respCat.json())
  //         .then(rsCat => {
  //           log('rsCategories : ', rsCat)
  //           log('rsCat complet:', JSON.stringify(rsCat, null, 2))
  //           const c = dispatch({
  //             type: 'SET_CATEGORIES',
  //             payload: {
  //               categories: rsCat.cat
  //             }
  //           })

  //           return c
  //         })
  //     }

  //     setCat()
  //   } catch (error) {
  //     log('error getCategories : ', error)
  //   }
  // }, [])

  // useEffect(() => {
  //   try {
  //     const setObj = async () => {
  //       const apiObj = `http://localhost:3001/getObjects`

  //       await fetch(apiObj)
  //         .then(respObj => respObj.json())
  //         .then(rsObj =>
  //           dispatch({
  //             type: 'SET_OBJECTS',
  //             payload: {
  //               objects: rsObj.obj
  //             }
  //           })
  //         )
  //     }

  //     setObj()
  //   } catch (error) {
  //     log('error getObjects : ', error)
  //   }
  // }, [])

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
