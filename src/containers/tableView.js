import { connect } from 'react-redux'
import { TableView } from '../components/tableView'

const mapStateToPropsForm = state => {
  return {
    selectedYear: state.selectedYear,
    selectedMonth: state.selectedMonth,
    prices: state.prices,
    activatedCats: state.activatedCats,
    activedObjs: state.activedObjs
  }
}

const TablePageContainer = connect(mapStateToPropsForm)(TableView)

export default TablePageContainer
