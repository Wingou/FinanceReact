
import { VIEW } from "../constants/constants"
import { store } from "../store/store"
 

interface ToView {
    
        type : string,
        payload : VIEW
    
}

interface SwitchToView {
    'HOME':string,
    'ADD':string,
    'BOARD':string
}

export const handleToView = (view:VIEW) =>{

            const toType:string = ({
                 'HOME':'TO_HOME',
                 'ADD':'TO_ADD',
                 'BOARD':'TO_BOARD'

            } as SwitchToView)[view]||''

            
           const action:ToView ={
                type : toType,
                payload : view
            }

            store.dispatch( action    )

}