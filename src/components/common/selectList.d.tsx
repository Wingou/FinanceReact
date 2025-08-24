import { CALLER } from "../../types/constants"
import { Categorie, Object } from "../../types/common"

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