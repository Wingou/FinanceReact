import { connect } from 'react-redux'
import { HomeView } from '../components/home/homeView'

const mapStateToProps = (state) => {
  return {
    years : state.years
  }
}
const HomeViewContainer = connect(mapStateToProps)(HomeView)
export default HomeViewContainer

