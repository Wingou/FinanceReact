import { CALLER } from "../../types/constants"
import { AddPriceInput, Categorie, Object } from "../../types/common"

export interface SelectCatProps {
    caller: CALLER,
    catId: number,
    categories: Categorie[]
}

export interface SelectObjProps {
    caller: CALLER,
    catId: number,
    objId: number,
    categories: Categorie[],
    objects: Object[]
}

export interface AddLineProps {
    caller: CALLER,
    addPriceInput: AddPriceInput,
    categories: Categorie[],
    objects: Object[]
}
