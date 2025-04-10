import { VIEW } from "../constants/constants"
import { store } from "../store/store"

interface ToView {
    type: string,
    payload: VIEW
}

export const handleToView = (view: VIEW) => {
    const action = (): ToView => {
        switch (view) {
            case 'HOME': return { type: 'TO_HOME', payload: 'HOME' };
            case 'ADD': return { type: 'TO_ADD', payload: 'ADD' };
            case 'BOARD': return { type: 'TO_BOARD', payload: 'BOARD' };
            default:
                throw new Error('ERROR TO VIEW');
        }
    }
    store.dispatch(action())
}