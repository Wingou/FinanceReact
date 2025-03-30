import { connect } from 'react-redux'
import { AddView } from '../components/add/addView'
 


const mapStateToProps = ({categories, objects}) => {
  return {
    categories,
    objects
  }
}
const AddViewContainer = connect(mapStateToProps)(AddView)
export default AddViewContainer


