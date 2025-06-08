import { AddObjectInput, AddPriceInput, Categorie, ModifPriceInput, Month, MostUsedObj, Object, OrderOptions, Price, SearchOptions, ViewOptions, Year } from '../../types/common'
import { SUM_TYPE } from '../../types/constants'


export interface HomeViewProps {
    categories: Categorie[],
    objects: Object[],
    mostUsedObjs: MostUsedObj[],
    addObjectInput: AddObjectInput

}


export interface InputObjProps {
    categories: Categorie[],
    objects: Object[],
    addObjectInput: AddObjectInput
}

