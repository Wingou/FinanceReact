import { CALLER } from "../../types/constants"
import { AddPriceInput, Categorie, MostUsedObj, Object } from "../../types/common"

export interface AddFormProps {
    caller: CALLER,
    addPriceInput: AddPriceInput,
    categories: Categorie[],
    objects: Object[]
}

export interface SelectObjProps {
    caller: CALLER,
    catId: number,
    objId: number,
    categories: Categorie[],
    objects: Object[],
    mostUsedObjs: MostUsedObj[]
}

export interface AddLineProps {
    caller: CALLER,
    addPriceInput: AddPriceInput,
    categories: Categorie[],
    objects: Object[],
    mostUsedObjs: MostUsedObj[]
}
