import { toast } from 'react-toastify'
import { store } from '../store/store'
import { PriceInput, ObjectInput } from '../types/common'
import { formatTextSQL } from '../utils/helper'
import { gql } from '@apollo/client'
import { apolloClient } from '../apollo-client'
import { PriceGql } from '../types/graphql'
import { CALLER } from '../types/constants'

export const handleCatIdInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const catId: string = e.target.value
  const action = {
    type: 'SET_CATID',
    payload: catId
  }
  store.dispatch(action)
}

export const handleObjIdInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const objId: string = e.target.value
  const action = {
    type: 'SET_OBJID',
    payload: objId
  }
  store.dispatch(action)
}

export const handleAddDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const actionDate: string = e.target.value.split('T')[0]
  const action = {
    type: 'PRICE_INPUT_SET_DATE',
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
    type: 'PRICE_INPUT_SET_PRICE',
    payload: e.target.value
  }
  store.dispatch(action)
}

export const handleAddCommentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const payload: string = e.target.value
  const action = {
    type: 'PRICE_INPUT_SET_COMMENT',
    payload
  }
  store.dispatch(action)
}

export const handleAddPriceCheck = async (priceInput: PriceInput, objectInput: ObjectInput) => {
  try {
    const api = gql`query GetPriceCheck ($where:PriceCheckWhereInput!) {
                      priceCheck(where: $where) {
                        id
                      }
                    }`
    const { amount, actionDate } = priceInput
    const { objId } = objectInput
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
      handleAddPrice(priceInput, objectInput)
    }
  }
  catch (error) {
    console.error('error addPriceCheck :', error)
    toast.error('Erreur réseau ou serveur sur AddPriceCheck')
  }
}

export const handleAddPrice = async (priceInput: PriceInput, objectInput: ObjectInput) => {
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
    const { amount, actionDate, comment } = priceInput
    const { objId } = objectInput
    const dataInput: { amount: string, objId: string, actionDate: string, comment: string } = {
      amount,
      objId: objId.toString(),
      actionDate,
      comment: formatTextSQL(comment)
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
      const payload: { caller: CALLER, price: PriceGql } = {
        caller: 'ADD',
        price: result
      }
      store.dispatch({
        type: 'SET_PRICES_AFTER',
        payload
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
