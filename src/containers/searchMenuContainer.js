import { connect } from "react-redux"
import SearchMenu from "../components/searchMenu"

const mapStateToPropsForm = state => {

  return {
    selectedPriceId: state.selectedPrice.id
  }
}

const SearchMenuContainer = connect(mapStateToPropsForm)(SearchMenu)

export default SearchMenuContainer