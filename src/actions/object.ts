import React from "react"
import { store } from "../store/store"
import { AddObjectInput } from "../types/common"
import { gql } from "@apollo/client"
import { apolloClient } from "../apollo-client"
import { ObjGql } from "../types/graphql"
import { toast } from "react-toastify"

export const handleAddObjectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const action = {
        type: 'ADDOBJECTINPUT',
        payload: e.target.value
    }
    store.dispatch(action)
}

export const handleAddObject = async (addObjectInput: AddObjectInput) => {
    try {
        const api = gql`
            mutation AddObject($insert: AddObjectInsertInput!) {
                addObject(insert: $insert) {
                    id         
                    name 
                    cat {id}
                }}
                `
        const dataInput = {
            objName: addObjectInput.objName,
            catId: addObjectInput.catId.toString(),
        }
        const response = await apolloClient.mutate({
            mutation: api,
            variables: {
                insert: dataInput,
            }
        })

        const result = response.data?.addObject as ObjGql
        if (result) {
            toast.success(`Objet ${dataInput.objName} est ajouté !`, {
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
                type: 'SET_OBJECT_AFTER_ADD',
                payload: result
            })
        }
        else {
            toast.error('Erreur d\'ajout d\'objet')
        }
    } catch (error) {
        console.error('error addObject :', error)
        toast.error('Erreur réseau ou serveur')
    }
}
