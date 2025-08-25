import { gql } from "@apollo/client"
import { store } from "../store/store"
import { ModifPriceInput, Price } from "../types/common"
import { formatTextSQL } from "../utils/helper"
import { apolloClient } from "../apollo-client"
import { PriceGql } from "../types/graphql"
import { toast } from "react-toastify"

export const handleModif = (price: Price) => {
  const payload: ModifPriceInput = {
    id: price.id,
    catId: price.cat.id,
    objId: price.obj.id,
    amount: price.amount.toString(),
    actionDate: price.actionDate,
    comment: price.comment,
    dateCreate: price.dateCreate,
    dateModif: price.dateModif,
    template: price.template
  }
  const action = {
    type: 'MODIFPRICEINPUT',
    payload
  }
  store.dispatch(action)
}

export const handleModifDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const actionDate: string = e.target.value.split('T')[0]
  const action = {
    type: 'MODIFPRICEINPUT_SET_DATE',
    payload: actionDate
  }
  store.dispatch(action)
}



export const handleModifPriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const valeur = e.target.value.replace(',', '.')
  if (!/^-?\d*\.?\d{0,2}$/.test(valeur)) {
    e.target.value = e.target.value.slice(0, -1)
  }

  const action = {
    type: 'MODIFPRICEINPUT_SET_PRICE',
    payload: e.target.value
  }
  store.dispatch(action)
}

export const handleModifCommentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const action = {
    type: 'MODIFPRICEINPUT_SET_COMMENT',
    payload: e.target.value
  }
  store.dispatch(action)
}

export const handleModifPrice = async (modifPriceInput: ModifPriceInput) => {
  try {
    const api = gql`
          mutation ModifPrice ($update: ModifPriceUpdateInput!) {
                        modifPrice (update : $update) {
                          id
                          amount
                          comment
                          actionDate
                          template
                          dateCreate
                          dateModif
                          obj {
                            id
                            name
                            }
                          cat {
                            id
                            name
                          }
                        }
                      }`
    const { id, amount, actionDate, comment, objId, template } = modifPriceInput
    const dataInput = {
      id,
      amount,
      objId: objId.toString(),
      actionDate: actionDate,
      comment: formatTextSQL(comment),
      template: template.toString()
    }
    const response = await apolloClient.mutate({
      mutation: api,
      variables: {
        update: dataInput,
      }
    })
    const result: PriceGql = response.data?.modifPrice
    if (result) {

      const msgToast = {
        0: `Prix ${result.amount}€ modifié !`,
        1: `Prix ${result.amount}€ en réserve !`,
        2: `Prix ${result.amount}€ supprimé !`,
      }[result.template] || `Prix ${result.amount}€ sans template !`

      toast.success(msgToast, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "light",
        style: {
          fontFamily: 'Verdana',
          fontSize: '12px',
          width: '200px'
        }
      }
      )
      store.dispatch({
        type: 'SET_PRICES_AFTER_MODIF',
        payload: result
      })
    }
    else {
      toast.error('Erreur de modification de prix')
    }
  } catch (error) {
    console.error('error modifPrice :', error)
    toast.error('Erreur réseau ou serveur')
  }
}
