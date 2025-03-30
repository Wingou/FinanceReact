import { store } from "../store"

export const handleToView = (view) =>{
            
           const action ={
                type : 'TO_'+view.toUpperCase(),
                payload : view
            }

            store.dispatch( action    )

}