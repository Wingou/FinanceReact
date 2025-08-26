import { CALLER } from "../types/constants"
import { store } from "../store/store"

export const handleCancel = (caller: CALLER) => {
    const action = {
        type: 'CANCEL_INPUT',
        payload: caller
    }
    store.dispatch(action)
}
