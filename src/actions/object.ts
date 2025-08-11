import React from "react"
import { store } from "../store/store"
import { ObjectInput } from "../types/common"
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

export const handleModifObjectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const action = {
        type: 'MODIFOBJECTINPUT',
        payload: e.target.value
    }
    store.dispatch(action)
}




export const handleAddObject = async (objectInput: ObjectInput) => {
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
            objName: objectInput.objName,
            catId: objectInput.catId.toString(),
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






export const handleModifObject = async (objectInput: ObjectInput) => {
    try {
        const api = gql`
            mutation ModifObject($update: ModifObjectInput!) {
                modifObject(update: $update) {
                    id         
                    name 
                    template
                }}
                `
        const dataInput = {
            objName: objectInput.objName,
            template: objectInput.template.toString(),
        }
        const response = await apolloClient.mutate({
            mutation: api,
            variables: {
                update: dataInput,
            }
        })

        const result = response.data?.modifObject as ObjGql
        if (result) {
            toast.success(`Objet ${dataInput.objName} est modifié !`, {
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
                type: 'SET_OBJECT_AFTER_MODIF',
                payload: result
            })
        }
        else {
            toast.error('Erreur de modif d\'objet')
        }
    } catch (error) {
        console.error('error modifObject :', error)
        toast.error('Erreur réseau ou serveur')
    }
}
