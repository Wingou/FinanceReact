import { store } from "../store/store"
import { OrderSelectValue } from "../types/common"

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

export const handleToggleOrderDir = (orderSelectValue: OrderSelectValue) => {
    const newOrderSelectValue = {
        ...orderSelectValue,
        dir: orderSelectValue.dir === 'ASC' ? 'DESC' : 'ASC'
    }

    store.dispatch({
        type: 'TOGGLE_ORDER_DIR',
        payload: newOrderSelectValue
    })
}