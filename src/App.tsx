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
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { gql } from '@apollo/client'
import { apolloClient } from './apollo-client'

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
        await fetchList('CAT', dispatch)
        console.log("Fetch cat")
        await fetchList('OBJ', dispatch)
        console.log("Fetch obj")
        await fetchList('YEARS', dispatch)
        console.log("Fetch years")
        setIsCOYLoaded(true)
      } catch (error) {
        console.error('ERROR: fetchListsData : ', error)
        setIsError(true)
      }
    }
    fetchListsData()
  }, [dispatch])

  console.log("ICIIII", view.page)

  useEffect(() => {
    const fetchPricesData = async () => {
      try {
        console.log("Fetch Avant Price")
        await fetchPrices(years, months, dispatch)
        console.log("Fetch après Price")
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
    if (view.isAddOpen) { return <AddViewContainer />; }
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h2 className='App-title'>FINANCE REACT</h2>
        {isCOYLoaded ? Menu :
          isError ? 'Data loading error !' : 'Loading...'}
      </header>
      {viewAddContainer()}
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
      }) // fetchPolicy: 'network-only' Forcer le cache d'Apollo

    dispatch({
      type: 'SET_PRICES',
      payload: data
    })
  } catch (error) {
    console.error('ERROR: fetchPrices', error)
  }
}
