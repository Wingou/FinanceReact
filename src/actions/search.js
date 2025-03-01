import { store } from "../App";





export const handlePriceId = (event) => {


    const {value} = event;

    const action = {
        type: "SELECTED_PRICEID",
        payload: value
    }
    store.dispatch(action);
    


}