import { connect } from "react-redux"
import {SearchMenu} from "../components/searchMenu"

const mapStateToPropsForm = state => {

  return {
    selectedYear: state.selectedYear,
    selectedMonth: state.selectedMonth,
    prices : state.prices
  }
}

const SearchMenuContainer = connect(mapStateToPropsForm)(SearchMenu)

export default SearchMenuContainer