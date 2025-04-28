import { store } from "../store/store"
import { ModifPriceInput, Price } from "../types/common"

export const handleModif = (price: Price) => {
  const action = {
    type: 'MODIFPRICEINPUT',
    payload: {
      id: price.id,
      catId: price.cat.id,
      objId: price.obj.id,
      amount: price.amount,
      actionDate: price.actionDate,
      comment: price.comment,
      dateCreate: price.dateCreate,
      dateModif: price.dateModif,
      template: price.template
    } as ModifPriceInput
  }
  store.dispatch(action)
}

