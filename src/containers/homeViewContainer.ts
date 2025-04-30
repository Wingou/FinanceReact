import { connect } from 'react-redux'
import { RootState } from '../store/store'
import { HomeView } from '../components/home/homeView'

const mapStateToProps = (state: RootState) => {
  return {
    years: state.years
  }
}
const HomeViewContainer = connect(mapStateToProps)(HomeView)
export default HomeViewContainer

