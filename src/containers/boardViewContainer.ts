import { connect } from 'react-redux'
import { BoardView } from '../components/board/boardView'
import { Categorie, Month, Price, Year } from '../types/common'
import { SUM_TYPE } from '../constants/constants'
import { RootState } from '../store/store'
import { BoardViewProps } from '../components/board/boardView.d'

const mapStateToProps = (state: RootState): BoardViewProps => {

  const {
    categories,
    prices,
    years,
    months,
    searchOptions,
    objects,
    modifPriceInput
  } = state

  const { searchMin, searchMax, isSearchDel } = searchOptions
  const activatedCats = categories
    .filter((cat: Categorie) => cat.isDisplayed)
    .sort((a: Categorie, b: Categorie) =>
      a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' })
    )
  const filteredCatIds = activatedCats
    .filter((cat: Categorie) => cat.isOn)
    .map((cat: Categorie) => cat.id)
  const filteredPrices = prices
    .filter((price: Price) => filteredCatIds.includes(price.cat.id))
    .filter((price: Price) =>
      searchOptions.searchWord.length < 3
        ? true
        : price.comment
          .replace(/\s/g, '')
          .toLowerCase()
          .includes(
            searchOptions.searchWord.replace(/\s/g, '').toLowerCase()
          ) ||
        price.obj.name
          .replace(/\s/g, '')
          .toLowerCase()
          .includes(searchOptions.searchWord.replace(/\s/g, '').toLowerCase())
    )
    .filter((price: Price) => (searchMin == null ? true : price.amount >= searchMin))
    .filter((price: Price) => (searchMax == null ? true : price.amount <= searchMax))
    .filter((price: Price) => (price.template == 2 ? isSearchDel : true))
  console.log('isSearchDel', isSearchDel)
  const filteredPricesCats = [...new Set(filteredPrices.map((p: Price) => p.cat.id))]
  const filteredCats = activatedCats
    .filter((cat: Categorie) => cat.isOn)
    .filter((cat: Categorie) => filteredPricesCats.includes(cat.id))
    .map((cat: Categorie) => {
      const recette = sumPrices(filteredPrices, cat, 'RECETTE')
      const depense = sumPrices(filteredPrices, cat, 'DEPENSE')
      const reserve = sumPrices(filteredPrices, cat, 'RESERVE')
      return {
        ...cat,
        recette,
        depense,
        reserve
      }
    })
  const isAllYearsChecked = years.filter((y: Year) => !y.isOn).length === 0
  const isAllMonthsChecked = months.filter((m: Month) => !m.isOn).length === 0
  const isAllCatsChecked = activatedCats.filter((c: Categorie) => !c.isOn).length === 0
  return {
    years,
    months,
    filteredPrices,
    activatedCats,
    filteredCats,
    isAllYearsChecked,
    isAllMonthsChecked,
    isAllCatsChecked,
    searchOptions,
    objects,
    modifPriceInput
  }
}
const BoardViewContainer = connect(mapStateToProps)(BoardView)
export default BoardViewContainer

interface IsPricePos {
  'RECETTE': boolean,
  'DEPENSE': boolean,
  'TOTAL': boolean,
  'RESERVE': boolean
}

const sumPrices = (filteredPrices: Price[], cat: Categorie, sumType: SUM_TYPE): number => {
  const recettePrices = filteredPrices.filter((price: Price) => price.cat.id === cat.id && price.amount < 0 && price.template == 0)
  const depensePrices = filteredPrices.filter((price: Price) => price.cat.id === cat.id && price.amount > 0 && price.template == 0)
  const totalPrices = filteredPrices.filter((price: Price) => price.cat.id === cat.id && price.template == 0)
  const reservePrices = filteredPrices.filter((price: Price) => price.cat.id === cat.id && price.template == 1)

  const prices = {
    'RECETTE': recettePrices,
    'DEPENSE': depensePrices,
    'RESERVE': reservePrices,
    'TOTAL': totalPrices
  }[sumType as SUM_TYPE] as Price[]

  return prices.reduce((acc: number, price: Price): number => acc + price.amount, 0)
}