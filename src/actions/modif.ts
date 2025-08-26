import { gql } from "@apollo/client"
import { store } from "../store/store"
import { CategoryInput, PriceInput, ObjectInput, Price } from "../types/common"
import { formatTextSQL } from "../utils/helper"
import { apolloClient } from "../apollo-client"
import { PriceGql } from "../types/graphql"
import { toast } from "react-toastify"

export const handleModif = (price: Price) => {
  const { id: priceId, amount, actionDate, comment, dateCreate, dateModif, template, obj, cat } = price
  const { id: objId, name: objName, template: objTemplate } = obj
  const { id: catId, name: catName, position, template: catTemplate } = cat
  const payload: { priceInput: PriceInput, objectInput: ObjectInput, categoryInput: CategoryInput } = {
    priceInput: {
      priceId,
      amount: amount.toString(),
      actionDate,
      comment,
      dateCreate,
      dateModif,
      template
    },
    objectInput: {
      objId: objId,
      objName,
      template: objTemplate
    },
    categoryInput: {
      catId,
      catName,
      template: catTemplate,
      position
    }
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
    type: 'PRICE_INPUT_SET_DATE',
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
    type: 'PRICE_INPUT_SET_PRICE',
    payload: e.target.value
  }
  store.dispatch(action)
}

export const handleModifCommentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const action = {
    type: 'PRICE_INPUT_SET_COMMENT',
    payload: e.target.value
  }
  store.dispatch(action)
}

export const handleModifPrice = async (priceInput: PriceInput, objectInput: ObjectInput) => {
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
    const { priceId, amount, actionDate, comment, template } = priceInput
    const { objId } = objectInput
    const dataInput: {
      id: string,
      amount: string,
      objId: string,
      actionDate: string,
      comment: string,
      template: string
    } = {
      id: priceId.toString(),
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
