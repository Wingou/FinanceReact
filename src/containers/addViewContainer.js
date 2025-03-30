import { connect } from 'react-redux'
import { AddView } from '../components/add/addView'
 


const mapStateToProps = (state) => {
  return {
    years : state.years
  }
}
const AddViewContainer = connect(mapStateToProps)(AddView)
export default AddViewContainer

