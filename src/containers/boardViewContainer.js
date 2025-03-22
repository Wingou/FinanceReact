import { connect } from 'react-redux'
import { BoardView } from '../components/boardView'

const mapStateToProps = ({
  categories,
  prices,
  years,
  months,
  activedObjs,
  filterOptions
}) => {
  const activatedCats = categories
    .filter(cat => cat.activated)
    .sort((a, b) =>
      a.catName.localeCompare(b.catName, 'fr', { sensitivity: 'base' })
    )
  const filteredCatIds = activatedCats
    .filter(cat => cat.filtered)
    .map(cat => cat.id)
  const filteredPrices = prices.filter(price =>
    filteredCatIds.includes(price.catId)
  )
  const filteredCats = activatedCats
    .filter(cat => cat.filtered)
    .map(cat => {
      const recette = sumPrices(filteredPrices, cat, 'recette')
      const depense = sumPrices(filteredPrices, cat, 'depense')
      return {
        ...cat,
        recette,
        depense
      }
    })

  const multipleYearsChecked = filterOptions.isMultipleYears
  const multipleMonthsChecked = filterOptions.isMultipleMonths
  const multipleCatsChecked = filterOptions.isMultipleCats

  const allYearsChecked = years.filter(y => !y.filtered).length === 0
  const allMonthsChecked = months.filter(m => !m.filtered).length === 0
  const allCatsChecked = activatedCats.filter(c => !c.filtered).length === 0

  return {
    years,
    months,
    filteredPrices,
    activatedCats,
    filteredCats,
    activedObjs,
    allYearsChecked,
    allMonthsChecked,
    allCatsChecked,
    multipleYearsChecked,
    multipleMonthsChecked,
    multipleCatsChecked
  }
}
const BoardViewContainer = connect(mapStateToProps)(BoardView)
export default BoardViewContainer

const sumPrices = (filteredPrices, cat, sumType) =>
  filteredPrices.reduce((acc, price) => {
    const isPricePos = {
      recette: price.priceValue < 0,
      depense: price.priceValue > 0
    }[sumType]
    return price.catId === cat.id && isPricePos ? acc + price.priceValue : acc
  }, 0)
