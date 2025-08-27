import React from "react"
import { toast } from "react-toastify"
import { store } from "../store/store"
import { CategoryInput } from "../types/common"
import { gql } from "@apollo/client"
import { apolloClient } from "../apollo-client"
import { CatGql, ObjGql } from "../types/graphql"

export const handleAddCategoryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const action = {
        type: 'SET_CATEGORY_INPUT',
        payload: e.target.value
    }
    store.dispatch(action)
}

export const handleAddCategory = async (categoryInput: CategoryInput) => {
    try {
        const api = gql`
            mutation AddCategory($insert: AddCategoryInsertInput!) {
                addCategory(insert: $insert) {
                    id         
                    name
                    position
                    template
                }}
                `
        const dataInput = {
            catName: categoryInput.catName
        }
        const response = await apolloClient.mutate({
            mutation: api,
            variables: {
                insert: dataInput,
            }
        })

        const result: CatGql = response.data?.addCategory
        if (result) {
            toast.success(`Categorie ${dataInput.catName} est ajoutée !`, {
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
            const { id, name: catName, template, position } = result
            const payload: CategoryInput = {
                catId: parseInt(id),
                catName,
                template,
                position
            }
            store.dispatch({
                type: 'SET_CATEGORY_AFTER_ADD',
                payload
            })
        }
        else {
            toast.error('Erreur d\'ajout de categorie')
        }
    }
    catch (error) {
        console.error('error addCategory :', error)
        toast.error('Erreur réseau ou serveur AddCategory')
    }
}

export const handleModifCategory = async (categoryInput: CategoryInput, template: number) => {
    try {
        const api = gql`
                    mutation ModifCategory($updateCat: ModifCategoryInput!) {
                    modifCategory(update: $updateCat) {
                        id
                        name
                        position
                        template
                        }
                    }`
        const dataInput = {
            id: categoryInput.catId.toString(),
            catName: categoryInput.catName,
            position: categoryInput.position.toString(),
            template: categoryInput.template.toString(),
        }
        const response = await apolloClient.mutate({
            mutation: api,
            variables: {
                updateCat: dataInput,
            }
        })
        const result: CatGql = response.data?.modifCategory
        const msg = template === 2 ? 'supprimé' : 'modifié'
        if (result) {
            toast.success(`Catégorie ${dataInput.catName} est ${msg} !`, {
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
                type: 'SET_CATEGORY_AFTER_MODIF',
                payload: result
            })
        }
        else {
            toast.error('Erreur de modif de catégorie')
        }
    } catch (error) {
        console.error('error modifCategory :', error)
        toast.error('Erreur réseau ou serveur')
    }
}