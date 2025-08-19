import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { RootState } from './store/store'
import BoardViewContainer from './containers/boardViewContainer'
import HomeViewContainer from './containers/homeViewContainer'
import React from 'react'
import { COY } from './types/constants'
import { Menu } from './components/common/menu'
import { Dispatch } from '@reduxjs/toolkit'
import { Month, Year } from './types/common'
import { ToastContainer } from 'react-toastify'
import { gql } from '@apollo/client'
import { apolloClient } from './apollo-client'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch()
  const years = useSelector((state: RootState) => state.years)
  const months = useSelector((state: RootState) => state.months)
  const view = useSelector((state: RootState) => state.view)
  const [isCOYLoaded, setIsCOYLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchListsData = async () => {
      try {
        dispatch({ type: '@@INIT' })
        await fetchList('CAT', dispatch)
        await fetchList('OBJ', dispatch)
        await fetchList('YEARS', dispatch)
        setIsCOYLoaded(true)
      } catch (error) {
        console.error('ERROR: fetchListsData : ', error)
        setIsError(true)
      }
    }
    fetchListsData()
  }, [dispatch])

  useEffect(() => {
    const { page, isLast } = view
    const fetchPricesData = async () => {
      try {
        await fetchPrices(years, months, dispatch)
      } catch (error) {
        console.error('ERROR: fetchPrices', error)
      }
    }
    const fetchLastData = async () => {
      try {
        await fetchLast(dispatch)
      } catch (error) {
        console.error('ERROR: fetchLast', error)
      }
    }
    page === 'BOARD'
      ?
      isLast ? fetchLastData() : fetchPricesData()
      : console.log('No fetchPricesData')

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
  return (
    <div className='App'>
      <header className='App-header'>
        <div className="HeaderTitle">
          Finance React
        </div>
        {isCOYLoaded ? <Menu view={view} /> :
          isError ? 'Data loading error !' : 'Loading...'}
      </header>
      {viewContainer()}
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
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
      'CAT': {
        api: gql`query GetCategories {
                  categories {
                    id
                    name
                    position
                    template
                  }
                }`,
        type: 'SET_CATEGORIES'
      },
      'OBJ': {
        api: gql`query GetObjets {
                  objects {
                    id
                    name
                    template
                    cat {
                      id
                    }
                    nbChild
                  }
                }`,
        type: 'SET_OBJECTS'
      },
      'YEARS': {
        api: gql`query GetYears {
                  years {
                    name
                  }
                }
                `,
        type: 'SET_YEARS'
      }
    }[coy_]
    const { data } = await apolloClient.query({ query: coy.api })

    dispatch({
      type: coy.type,
      payload: data
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
    const api = gql`query GetPricesByDates {
      pricesByDates(where: {years: "${filteredYears}", months: "${filteredMonths}"}) {
        id
        amount
        comment
        actionDate
        dateCreate
        dateModif
        template
        obj {
          id
          name
          template
        }
        cat {
          id
          name
          position
          template
        }
      }
    }`
    const { data } = await apolloClient.query(
      {
        query: api,
        fetchPolicy: 'network-only'
      })

    dispatch({
      type: 'SET_PRICES',
      payload: data.pricesByDates
    })
  } catch (error) {
    console.error('ERROR: fetchPrices', error)
  }
}



const fetchLast = async (dispatch: Dispatch) => {
  try {
    const api = gql`query GetLastPrices {
      lastPrices {
        id
        amount
        comment
        actionDate
        dateCreate
        dateModif
        template
        obj {
          id
          name
          template
        }
        cat {
          id
          name
          position
          template
        }
      }
    }`
    const { data } = await apolloClient.query(
      {
        query: api,
        fetchPolicy: 'network-only'
      })
    dispatch({
      type: 'SET_PRICES',
      payload: data.lastPrices
    })
  } catch (error) {
    console.error('ERROR: fetchLastPrices', error)
  }
}


