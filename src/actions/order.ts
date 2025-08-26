import { store } from "../store/store"
import { OrderOption } from "../types/common"

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

export const handleToggleOrderDir = (orderOption: OrderOption) => {
    const newOrderOption: OrderOption = {
        ...orderOption,
        dir: orderOption.dir === 'ASC' ? 'DESC' : 'ASC'
    }

    store.dispatch({
        type: 'TOGGLE_ORDER_DIR',
        payload: newOrderOption
    })
}