import { Provider } from "react-redux"
// import { personneVoid } from "./models/constante"
import { configureStore } from "@reduxjs/toolkit"
import { mainReducer } from "../src/reducers/reducer"
import  SearchMenu from "./containers/searchMenuContainer"
// import { useQuery } from "react-query"

export const store = configureStore(
  {
    reducer: mainReducer
  }
)

// const fetchPersonnes = async () => {
//   const apiUrl = "http://localhost:3001/items";
//   return await fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => data
//     )
//     .catch(error => console.error(error));
// }

function App() {

  // const { isLoading, data, isError } = useQuery("personnes", fetchPersonnes);

  // if (isLoading) { return <div className="App">Chargement...</div> }

  // if (isError) { return <div className="App">Erreur !</div> }

  // store.dispatch({
  //   type: "INITIALISATION",
  //   payload: {
  //     isDisplayForm: false,
  //     personne: data,
  //     personneInput: personneVoid
  //   }
  // })

  store.dispatch({
    type: "INITIALISATION",
    payload: {
      selectedPrice : {
          id : -1
      }
    }
  })

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">AD directory</h1>
        </header>
        
        <SearchMenu />
      </div>
    </Provider>
  )
}

export default App;
