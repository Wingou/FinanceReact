import { gql } from "@apollo/client"
import { store } from "../store/store"
import { ModifPriceInput, Price } from "../types/common"
import { formatTextSQL } from "../utils/helper"
import { apolloClient } from "../apollo-client"
import { PriceGql } from "../types/graphql"
import { toast } from "react-toastify"

export const handleModif = (price: Price) => {
  const action = {
    type: 'MODIFPRICEINPUT',
    payload: {
      id: price.id,
      catId: price.cat.id,
      objId: price.obj.id,
      amount: price.amount.toString(),
      actionDate: price.actionDate,
      comment: price.comment,
      dateCreate: price.dateCreate,
      dateModif: price.dateModif,
      template: price.template
    } as ModifPriceInput
  }
  store.dispatch(action)
}

export const handleModifDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const actionDate = e.target.value.split('T')[0]
  const action = {
    type: 'MODIFPRICEINPUT_SET_DATE',
    payload: actionDate
  }
  store.dispatch(action)
}


export const handleModifObjIdInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const objId = e.target.value
  const action = {
    type: 'MODIFPRICEINPUT_SET_OBJID',
    payload: objId
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
          mutation ModifPrice ($update: ModifPriceInput!) {
                        price (id: $id, update : $update) {
                          id
                          amount
                          comment
                          actionDate
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
    const { id, amount, actionDate, comment, objId } = modifPriceInput
    const dataInput = {
      amount,
      objId: objId.toString(),
      actionDate: actionDate,
      comment: formatTextSQL(comment)
    }
    const response = await apolloClient.mutate({
      mutation: api,
      variables: {
        id,
        update: dataInput,
        // fetchPolicy: 'network-only'
      }
    })
    const result = response.data?.price as PriceGql
    if (result) {
      toast.success(`Prix ${dataInput.amount}€ modifié !`, {
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
