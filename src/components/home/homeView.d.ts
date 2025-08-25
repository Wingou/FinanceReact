import { AddObjectInput, AddPriceInput, Categorie, CategoryInput, ModifPriceInput, Month, Object, Object, OrderOptions, Price, SearchOptions, ViewOptions, Year } from '../../types/common'
import { SUM_TYPE } from '../../types/constants'

export interface HomeViewProps {
    categories: Categorie[],
    objects: Object[],
    objectInput: ObjectInput,
    categoryInput: CategoryInput
}