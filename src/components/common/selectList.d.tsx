import { CALLER } from "../../constants/constants"
import { AddPriceInput, Categorie, Object } from "../../types/common"

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
    objects: Object[]
}