import { connect } from 'react-redux'
import { RootState } from '../store/store'
import { HomeView } from '../components/home/homeView'

const mapStateToProps = (state: RootState) => {
  return {
    addPriceInput: state.addPriceInput,
    categories: state.categories,
    objects: state.objects,
    mostUsedObjs: state.mostUsedObjects,
    addObjectInput: state.addObjectInput

  }
}
const HomeViewContainer = connect(mapStateToProps)(HomeView)
export default HomeViewContainer

