import { store } from "../store/store"
import { AddPriceInput, Price } from "../types/common"

export const handleModif = (price:Price) => {
         const action = {
                    type:'MODIFPRICEINPUT',
                    payload : {
                        catId: price.cat.id,
                        objId: price.obj.id,
                        amount: price.amount.toString(),
                        actionDate: price.actionDate,
                        comment: price.comment
                      } as AddPriceInput
        }
        store.dispatch(action)
}

