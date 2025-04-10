import { connect } from 'react-redux'
import { HomeView } from '../components/home/homeView'
import { RootState } from '../store/store'

const mapStateToProps = (state:RootState) => {
  return {
    years : state.years
  }
}
const HomeViewContainer = connect(mapStateToProps)(HomeView)
export default HomeViewContainer

