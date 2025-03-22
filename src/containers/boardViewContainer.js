import { connect } from 'react-redux'
import { BoardView } from '../components/boardView'

const mapStateToProps = ({
  categories,
  prices,
  years,
  months,
  activedObjs
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


  return {
    years,
    months,
    filteredPrices,
    activatedCats,
    filteredCats,
    activedObjs
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
