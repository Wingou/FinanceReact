import { connect } from 'react-redux'
import { RootState } from '../store/store'
import { HomeView } from '../components/home/homeView'
import { createContext } from 'react'
import { HomeViewProps } from '../components/home/homeView.d'
import { initialCategoryInput, initialObjectInput } from '../models/initialModel'

const mapStateToProps = (state: RootState): HomeViewProps => {
  return {
    categories: state.categories,
    objects: state.objects,
    objectInput: state.objectInput,
    categoryInput: state.categoryInput
  }
}
const HomeViewContainer = connect(mapStateToProps)(HomeView)
export default HomeViewContainer

export const HomeViewContext = createContext<HomeViewProps>({
  categories: [],
  objects: [],
  objectInput: initialObjectInput,
  categoryInput: initialCategoryInput
})
