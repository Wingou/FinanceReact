import { toast } from 'react-toastify'
import { store } from '../store/store'
import { AddPriceInput } from '../types/common'
import { formatTextSQL } from '../utils/helper'
import { gql } from '@apollo/client'
import { apolloClient } from '../apollo-client'
import { PriceGql } from '../types/graphql'
import { CALLER } from '../types/constants'

export const handleCatIdInput = (e: React.ChangeEvent<HTMLSelectElement>, caller: CALLER) => {
  const catId = e.target.value
  const action = {
    type: 'SET_CATID',
    payload: {
      catId,
      caller
    }
  }
  store.dispatch(action)
}




export const handleObjIdInput = (e: React.ChangeEvent<HTMLSelectElement>, caller: CALLER) => {
  const objId = e.target.value
  const action = {
    type: 'SET_OBJID',
    payload: {
      caller,
      objId
    }
  }
  store.dispatch(action)
}

export const handleAddDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const actionDate = e.target.value.split('T')[0]
  const action = {
    type: 'ADDPRICEINPUT_SET_DATE',
    payload: actionDate
  }
  store.dispatch(action)
}

export const handleAddPriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const valeur = e.target.value.replace(',', '.')
  if (!/^-?\d*\.?\d{0,2}$/.test(valeur)) {
    e.target.value = e.target.value.slice(0, -1)
  }

  const action = {
    type: 'ADDPRICEINPUT_SET_PRICE',
    payload: e.target.value
  }
  store.dispatch(action)
}

export const handleAddCommentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const action = {
    type: 'ADDPRICEINPUT_SET_COMMENT',
    payload: e.target.value
  }
  store.dispatch(action)
}

export const handleAddPrice = async (addPriceInput: AddPriceInput) => {
  try {
    const api = gql`
          mutation AddPrice ($insert: AddPriceInsertInput!) {
                        addPrice (insert : $insert) {
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
    const dataInput = {
      amount: addPriceInput.amount,
      objId: addPriceInput.objId.toString(),
      actionDate: addPriceInput.actionDate,
      comment: formatTextSQL(addPriceInput.comment)
    }
    const response = await apolloClient.mutate({
      mutation: api,
      variables: {
        insert: dataInput,
      }
    })
    const result = response.data?.addPrice as PriceGql
    if (result) {
      toast.success(`Prix ${dataInput.amount}€ ajouté !`, {
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
        type: 'SET_PRICES_AFTER_ADD',
        payload: result
      })
    }
    else {
      toast.error('Erreur d\'ajout de prix')
    }
  } catch (error) {
    console.error('error addPrice :', error)
    toast.error('Erreur réseau ou serveur')
  }
}
