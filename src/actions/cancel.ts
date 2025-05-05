import { store } from "../store/store"
import { ModifPriceInput, Price } from "../types/common"

export const handleCancel = () => {
    const action = {
        type: 'CANCELPRICEINPUT',
        payload: ''
    }
    store.dispatch(action)
}
