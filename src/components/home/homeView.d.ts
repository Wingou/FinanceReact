import { Categorie, CategoryInput, Object, ObjectInput } from '../../types/common'

export interface HomeViewProps {
    categories: Categorie[],
    objects: Object[],
    objectInput: ObjectInput,
    categoryInput: CategoryInput
}