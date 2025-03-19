import { connect } from 'react-redux'
import { TableView } from '../components/tableView'

const mapStateToPropsForm = state => {
  const activatedCats_ = state.catsAll
    .filter(cat => cat.activated)
    .map(c => {
      return { catId: c.id, catName: c.catName, filtered: c.filtered }
    })
    .sort((a, b) =>
      a.catName.localeCompare(b.catName, 'fr', { sensitivity: 'base' })
    )

  return {
    selectedYear: state.selectedYear,
    selectedMonth: state.selectedMonth,
    prices: state.prices,
    activatedCats: activatedCats_,
    activedObjs: state.activedObjs
  }
}
const TablePageContainer = connect(mapStateToPropsForm)(TableView)
export default TablePageContainer
