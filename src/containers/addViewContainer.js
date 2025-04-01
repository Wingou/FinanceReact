import { connect } from 'react-redux'
import { AddView } from '../components/add/addView'
import { sumPrices } from './boardViewContainer'
 


const mapStateToProps = ({categories, objects,addPriceInput, prices}) => {


  const filteredPrices = prices.sort((a,b)=> a.dateModif.localeCompare(b.dateModif))
                    .slice(0,10)
    
  const filteredPricesCats = [...new Set(filteredPrices.map(p => p.catId))]
  const filteredCats = categories
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

  return {
    categories,
    objects,
    addPriceInput,
    filteredPrices,
    filteredCats
  }
}
const AddViewContainer = connect(mapStateToProps)(AddView)
export default AddViewContainer


