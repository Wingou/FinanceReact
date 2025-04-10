import { connect } from 'react-redux'
import { AddView } from '../components/add/addView'
import { sumPrices } from './boardViewContainer'
import { AddPriceInput, Categorie, Object, Price } from '../types/common'
import { RootState } from '../store/store'


interface AddViewProps {
  categories: Categorie[]
  , objects:Object[]
  , addPriceInput: AddPriceInput
  ,filteredPrices: Price[],
  filteredCats: Categorie[]
}

// Container prend state en param et retourne des props.
const mapStateToProps = (state : RootState):  AddViewProps => {

  const { categories, objects, addPriceInput, prices } = state

  const filteredPricesCats = [...new Set(prices.map((p:Price) => p.catId))]
  const filteredCats = categories
    .filter((cat:Categorie) => filteredPricesCats.includes(cat.id))
    .map((cat:Categorie) => {
      const recette = sumPrices(prices, cat, 'RECETTE')
      const depense = sumPrices(prices, cat, 'DEPENSE')
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
