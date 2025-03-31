import { connect } from 'react-redux'
import { AddView } from '../components/add/addView'
 


const mapStateToProps = ({categories, objects,addPriceInput}) => {
  return {
    categories,
    objects,
    addPriceInput
  }
}
const AddViewContainer = connect(mapStateToProps)(AddView)
export default AddViewContainer


