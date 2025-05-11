import { store } from "../store/store"

export const handleOrderInput = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    store.dispatch({
        type: 'UPDATE_ORDER_INPUT',
        payload: {
            value: e.target.value,
            index: index
        }
    }
    )
}


