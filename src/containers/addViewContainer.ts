import { connect } from 'react-redux'
import { AddView } from '../components/add/addView'
import { sumPrices } from './boardViewContainer'

const mapStateToProps = ({ categories, objects, addPriceInput, prices }) => {
  const filteredPricesCats = [...new Set(prices.map(p => p.catId))]
  const filteredCats = categories
    .filter(cat => filteredPricesCats.includes(cat.id))
    .map(cat => {
      const recette = sumPrices(prices, cat, 'recette')
      const depense = sumPrices(prices, cat, 'depense')
      return {
        ...cat,
        recette,
        depense
      }
    })

  return {
    categories,
    objects,
    addPriceInput,
    filteredPrices: prices,
    filteredCats
  }
}
const AddViewContainer = connect(mapStateToProps)(AddView)
export default AddViewContainer
