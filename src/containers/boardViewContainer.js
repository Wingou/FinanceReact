import { connect } from 'react-redux'
import { BoardView } from '../components/board/boardView'

const mapStateToProps = ({
  categories,
  prices,
  years,
  months,
  activedObjs,
  filterOptions
}) => {
  const { searchMin, searchMax } = filterOptions
  const activatedCats = categories
    .filter(cat => cat.activated)
    .sort((a, b) =>
      a.catName.localeCompare(b.catName, 'fr', { sensitivity: 'base' })
    )
  const filteredCatIds = activatedCats
    .filter(cat => cat.filtered)
    .map(cat => cat.id)
  const filteredPrices = prices
    .filter(price => filteredCatIds.includes(price.catId))
    .filter(price =>
      filterOptions.searchWord.length < 3
        ? true
        : price.comment
            .replace(/\s/g, '')
            .toLowerCase()
            .includes(
              filterOptions.searchWord.replace(/\s/g, '').toLowerCase()
            ) ||
          price.objName
            .replace(/\s/g, '')
            .toLowerCase()
            .includes(filterOptions.searchWord.replace(/\s/g, '').toLowerCase())
    )
    .filter(price => (searchMin == null ? true : price.priceValue >= searchMin))
    .filter(price => (searchMax == null ? true : price.priceValue <= searchMax))
  const filteredPricesCats = [...new Set(filteredPrices.map(p => p.catId))]
  const filteredCats = activatedCats
    .filter(cat => cat.filtered)
    .filter(cat => filteredPricesCats.includes(cat.id))
    .map(cat => {
      const recette = sumPrices(filteredPrices, cat, 'recette')
      const depense = sumPrices(filteredPrices, cat, 'depense')
      return {
        ...cat,
        recette,
        depense
      }
    })
  const isAllYearsChecked = years.filter(y => !y.filtered).length === 0
  const isAllMonthsChecked = months.filter(m => !m.filtered).length === 0
  const isAllCatsChecked = activatedCats.filter(c => !c.filtered).length === 0
  return {
    years,
    months,
    filteredPrices,
    activatedCats,
    filteredCats,
    activedObjs,
    isAllYearsChecked,
    isAllMonthsChecked,
    isAllCatsChecked,
    filterOptions
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
