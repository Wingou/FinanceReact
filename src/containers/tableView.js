import { connect } from 'react-redux'
import { TableView } from '../components/tableView'

const mapStateToPropsForm = state => {
  const cats_ = state.catsAll
    .filter(cat => cat.activated)
    .map(c => {
      return { catId: c.id, catName: c.catName, filtered: c.filtered }
    })
    .sort((a, b) =>
      a.catName.localeCompare(b.catName, 'fr', { sensitivity: 'base' })
    )

  const activatedCats_ = cats_.map(cat => {
    const recette_ = state.prices.reduce((acc, price) => {
      return price.catId === cat.catId && price.priceValue < 0
        ? acc + price.priceValue
        : acc
    }, 0)

    const depense_ = state.prices.reduce((acc, price) => {
      return price.catId === cat.catId && price.priceValue > 0
        ? acc + price.priceValue
        : acc
    }, 0)

    const total_ = recette_ + depense_

    return {
      ...cat,
      recette: recette_,
      depense: depense_,
      total: total_
    }
  })



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
