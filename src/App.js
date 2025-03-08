import { Provider } from "react-redux"
// import { personneVoid } from "./models/constante"
import { configureStore } from "@reduxjs/toolkit"
import { mainReducer } from "../src/reducers/reducer"
import  SearchMenu from "./containers/searchMenuContainer"
import { useQuery } from "react-query";
// import { useQuery } from "react-query"

export const store = configureStore(
  {
    reducer: mainReducer
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const fetchPricesByCurrentMonth = async () => {
  const apiUrl = "http://localhost:3001/pricesByMonthYear?year=2025&month=1";
  return await fetch(apiUrl)
    .then(response => response.json())
    .then(data => data
    )
    .catch(error => console.error(error));
}

function App() {


  const { isLoading, data, isError } = useQuery("personnes", fetchPricesByCurrentMonth);

  if (isLoading) { return <div className="App">Loading...</div> }
  if (isError) { return <div className="App">Error !</div> }

  store.dispatch({
    type: "INITIALISATION",
    payload: {
      prices: data.prices,
      selectedYear : data.selectedYear,
      selectedMonth : data.selectedMonth
    }
  })

  // store.dispatch({
  //   type: "INITIALISATION",
  //   payload: {
  //     selectedPriceId : -1
  //   }
  // })

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">FINANCE REACT</h1>
        </header>
        
        <SearchMenu />
      </div>
    </Provider>
  )
}

export default App;
