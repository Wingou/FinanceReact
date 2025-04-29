import { connect } from 'react-redux'
import { AddView } from '../components/add/addView'
import { AddPriceInput, Categorie, Object } from '../types/common'
import { RootState } from '../store/store'
import { CALLER } from '../constants/constants'

interface AddViewProps {
  caller: CALLER,
  categories: Categorie[]
  , objects: Object[]
  , addPriceInput: AddPriceInput
}

const mapStateToProps = (state: RootState): AddViewProps => {
  const { categories, objects, addPriceInput } = state
  return {
    caller: 'ADD',
    categories,
    objects,
    addPriceInput
  }
}
const AddViewContainer = connect(mapStateToProps)(AddView)
export default AddViewContainer
