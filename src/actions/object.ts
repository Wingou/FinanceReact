import React from "react"
import { store } from "../store/store"
import { CategoryInput, ObjectInput } from "../types/common"
import { gql } from "@apollo/client"
import { apolloClient } from "../apollo-client"
import { ObjGql } from "../types/graphql"
import { toast } from "react-toastify"

export const handleAddObjectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const action = {
        type: 'SET_OBJECT_INPUT',
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

export const handleAddObject = async (objectInput: ObjectInput, categoryInput: CategoryInput) => {
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
            catId: categoryInput.catId.toString(),
        }
        const response = await apolloClient.mutate({
            mutation: api,
            variables: {
                insert: dataInput,
            }
        })

        const result: ObjGql = response.data?.addObject
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

export const handleModifObject = async (objectInput: ObjectInput, template: Number) => {
    try {
        const api = gql`
                    mutation ModifObject($updateObj: ModifObjectInput!) {
                    modifObject(update: $updateObj) {
                        id
                        name
                        cat {
                            id
                        }
                        template
                        }
                    }`
        const dataInput = {
            id: objectInput.objId.toString(),
            objName: objectInput.objName,
            template: template.toString()
        }
        const response = await apolloClient.mutate({
            mutation: api,
            variables: {
                updateObj: dataInput,
            }
        })
        const result: ObjGql = response.data?.modifObject
        const msg = template === 2 ? 'supprimé' : 'modifié'
        if (result) {
            toast.success(`Objet ${dataInput.objName} est ${msg} !`, {
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
