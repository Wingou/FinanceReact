import { connect } from 'react-redux'
import { AddView } from '../components/add/addView'
import { sumPrices } from './boardViewContainer'
import { AddPriceInput, Categorie, Object, Price } from '../types/common'
import { RootState } from '../store/store'


interface AddViewProps {
  categories: Categorie[]
  , objects:Object[]
  , addPriceInput: AddPriceInput
}

const mapStateToProps = (state : RootState):  AddViewProps => {

  const { categories, objects, addPriceInput } = state

  return {
    categories,
    objects,
    addPriceInput
  }
}
const AddViewContainer = connect(mapStateToProps)(AddView)
export default AddViewContainer
