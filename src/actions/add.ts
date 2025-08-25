import { toast } from 'react-toastify'
import { store } from '../store/store'
import { AddPriceInput } from '../types/common'
import { formatTextSQL } from '../utils/helper'
import { gql } from '@apollo/client'
import { apolloClient } from '../apollo-client'
import { PriceGql } from '../types/graphql'
import { CALLER } from '../types/constants'

export const handleCatIdInput = (e: React.ChangeEvent<HTMLSelectElement>, caller: CALLER) => {
  const catId: string = e.target.value
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
  const objId: string = e.target.value
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
  const actionDate: string = e.target.value.split('T')[0]
  const action = {
    type: 'ADDPRICEINPUT_SET_DATE',
    payload: actionDate
  }
  store.dispatch(action)
}

export const handleAddPriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value: string = e.target.value
  const valeur = value.replace(',', '.')
  if (!/^-?\d*\.?\d{0,2}$/.test(valeur)) {
    e.target.value = value.slice(0, -1)
  }
  const action = {
    type: 'ADDPRICEINPUT_SET_PRICE',
    payload: value
  }
  store.dispatch(action)
}

export const handleAddCommentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const payload: string = e.target.value
  const action = {
    type: 'ADDPRICEINPUT_SET_COMMENT',
    payload
  }
  store.dispatch(action)
}

export const handleAddPriceCheck = async (addPriceInput: AddPriceInput) => {
  try {
    const api = gql`query GetPriceCheck ($where:PriceCheckWhereInput!) {
                      priceCheck(where: $where) {
                        id
                      }
                    }`
    const { amount, actionDate, objId } = addPriceInput
    const dataInput: { amount: string, actionDate: string, objId: number } = { amount, actionDate, objId }
    const { data } = await apolloClient.query(
      {
        query: api,
        variables: { where: dataInput },
        fetchPolicy: 'network-only'
      })
    const result: string[] = data?.priceCheck
    if (result.length > 0) {
      toast.info(`Ce prix ${dataInput.amount}€ à cette date ${dataInput.actionDate} existe déjà !`, {
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
    }
    else {
      handleAddPrice(addPriceInput)
    }
  }
  catch (error) {
    console.error('error addPriceCheck :', error)
    toast.error('Erreur réseau ou serveur sur AddPriceCheck')
  }
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
    const dataInput: { amount: string, objId: string, actionDate: string, comment: string } = {
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
    const result: PriceGql = response.data?.addPrice
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
