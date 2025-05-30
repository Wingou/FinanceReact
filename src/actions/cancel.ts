import { CALLER } from "../types/constants"
import { store } from "../store/store"
import { ModifPriceInput, Price } from "../types/common"

export const handleCancel = (caller: CALLER) => {
    const action = {
        type: 'CANCEL_INPUT',
        payload: caller
    }
    store.dispatch(action)
}
