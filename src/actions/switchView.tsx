import { PAGE } from "../types/constants"
import { store } from "../store/store"

interface ToView {
    type: string,
    payload: PAGE
}

export const handleToPage = (page: PAGE) => {
    const action = (): ToView => {
        switch (page) {
            case 'HOME': return { type: 'TO_HOME', payload: 'HOME' };
            case 'BOARD': return { type: 'TO_BOARD', payload: 'BOARD' };
            default:
                throw new Error('ERROR TO PAGE');
        }
    }
    store.dispatch(action())
}

export const handleToggleAdd = () => {
    const action = { type: 'TOGGLE_ADD', payload: null }
    store.dispatch(action)
}

export const handleToggleLast = () => {
    const action = { type: 'TOGGLE_LAST', payload: null }
    store.dispatch(action)
}