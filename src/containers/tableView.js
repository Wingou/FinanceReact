import { connect } from 'react-redux'
import { TableView } from '../components/tableView'

const mapStateToPropsForm = state => {
  return {
    selectedYear: state.selectedYear,
    selectedMonth: state.selectedMonth,
    prices: state.prices,
    catsOn: state.catsOn,
    objsOn: state.objsOn
  }
}

const TablePageContainer = connect(mapStateToPropsForm)(TableView)

export default TablePageContainer
