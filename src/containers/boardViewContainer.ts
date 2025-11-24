import { connect } from 'react-redux'
import { BoardView } from '../components/board/boardView'
import { Categorie, Month, OrderOption, Price, Year } from '../types/common'
import { ORDERDIR, SUM_TYPE } from '../types/constants'
import { RootState } from '../store/store'
import { BoardViewProps, NbObjPerCat, TitleAmountMapPrices } from '../components/board/boardView.d'
import { formatDateYYYYMMDD, formatFirstDay, formatFirstMonth } from '../utils/helper'
import { createContext } from 'react'
import { initialPriceInput, initialCategoryInput, initialObjectInput, initialOrderOptions, initialSearchOption, initialViewOption } from '../models/initialModel'

const mapStateToProps = (state: RootState): BoardViewProps => {

  const {
    categories,
    prices,
    years,
    months,
    searchOptions,
    objects,
    priceInput,
    view,
    orderOptions,
    objectInput,
    categoryInput
  } = state

  const { isAddOpen, isLast, isColObj, isColDay, isColMonth } = view
  const { searchMin, searchMax, isSearchDeleted, isSearchReserved } = searchOptions
  const orderRefs = orderOptions.filter((v: OrderOption) => v.selectedPos >= 0)
    .sort((a: OrderOption, b: OrderOption) => a.selectedPos - b.selectedPos)
  const deletedPricesCatIds = [...new Set(
    prices.filter((price: Price) => price.template === 2)
      .map((price: Price) => price.cat.id))]

  const notDeletedPricesCatIds = [...new Set(prices.filter((price: Price) => price.template !== 2)
    .map((price: Price) => price.cat.id))]

  const onlyDeletedPricesCatIds = deletedPricesCatIds.filter((catId: number) => !notDeletedPricesCatIds.includes(catId))

  const reservedPricesCatIds = [...new Set(
    prices.filter((price: Price) => price.template === 1)
      .map((price: Price) => price.cat.id))]

  const notReservedPricesCatIds = [...new Set(prices.filter((price: Price) => price.template !== 1)
    .map((price: Price) => price.cat.id))]

  const onlyReservedPricesCatIds = reservedPricesCatIds.filter((catId: number) => !notReservedPricesCatIds.includes(catId))

  const displayedCats = categories
    .filter((cat: Categorie) => cat.isDisplayed)
    .filter((cat: Categorie) => !isSearchDeleted
      ? !onlyDeletedPricesCatIds.includes(cat.id) : true)
    .filter((cat: Categorie) => !isSearchReserved
      ? !onlyReservedPricesCatIds.includes(cat.id) : true)
    .sort((a: Categorie, b: Categorie) =>
      a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' })
    )

  const selectedCatIds = displayedCats
    .filter((cat: Categorie) => cat.isOn)
    .map((cat: Categorie) => cat.id)

  const filteredPrices_ = prices
    .filter((price: Price) => price.template < 3)
    .filter((price: Price) => selectedCatIds.includes(price.cat.id))
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
    .filter((price: Price) => (searchMin === null ? true : price.amount >= searchMin))
    .filter((price: Price) => (searchMax === null ? true : price.amount <= searchMax))
    .filter((price: Price) => (price.template === 2 ? isSearchDeleted : true))
    .filter((price: Price) => (price.template === 1 ? isSearchReserved : true))

  const filteredPrices__: Price[] = isColObj
    ? filteredPrices_
    : filteredPrices_
      .reduce((acc: Price[], p: Price): Price[] => {

        const { actionDate, template, amount, comment } = p
        const acc_: { actionDate: string, template: number }[] = acc.map((p: Price) => {
          return {
            actionDate: p.actionDate,
            template: p.template
          }
        })

        return acc_.filter((a) => a.actionDate === actionDate && a.template === template).length === 0 || acc.length === 0
          ? [...acc, p]
          : acc.map((a) => {
            const isMatched: boolean = a.actionDate === actionDate && a.template === template
            const amount_: number = isMatched ? a.amount + amount : a.amount
            const comment_: string = isMatched && comment !== '' ? a.comment + ' ¤ ' + comment : a.comment
            const isGroupby: boolean = isMatched ? true : a.isGroupby
            return {
              ...a,
              amount: amount_,
              comment: comment_,
              isGroupby
            }
          }
          )
      }
        , [])

  const filteredPrices___: Price[] = isColDay
    ? filteredPrices__
    : filteredPrices__
      .reduce((acc: Price[], p: Price): Price[] => {
        const formatForReduce = isColMonth ? formatFirstDay : formatFirstMonth
        const { actionDate, template, amount, comment, obj } = p // YYYY-MM-DD 00:00:00
        const objId: number = obj.id
        const actionDay: string = formatForReduce(actionDate)
        const acc_: { actionDay: string, objId: number, template: number }[] = acc.map((p) => {
          return {
            actionDay: formatForReduce(p.actionDate),
            objId: p.obj.id,
            template: p.template
          }
        })
        const isPriceInAcc: boolean = isColObj
          ? acc_.filter((a) =>
            a.actionDay === actionDay
            && a.template === template
            && a.objId === objId
          ).length !== 0
          : acc_.filter((a) =>
            a.actionDay === actionDay
            && a.template === template
          ).length !== 0
        return !isPriceInAcc || acc.length === 0
          ? [...acc, p]
          : acc.map((a) => {
            const isMatched: boolean =
              isColObj ?
                formatForReduce(a.actionDate) === actionDay
                && a.template === template
                && a.obj.id === objId
                : formatForReduce(a.actionDate) === actionDay
                && a.template === template
            return {
              ...a,
              amount: isMatched ? a.amount + amount : a.amount,
              comment: isMatched && comment !== '' ? a.comment + ' ¤ ' + comment : a.comment,
              actionDate: formatForReduce(a.actionDate),
              isGroupby: isMatched ? true : a.isGroupby
            }
          }
          )
      }
        , [])

  const filteredPrices = filteredPrices___
    .sort((a: Price, b: Price) => {
      if (orderRefs.length === 0) {
        return a.dateModif.localeCompare(b.dateModif)
      }
      else {
        return orderRefs.reduce((acc: number, orderRef: OrderOption) => {
          return acc !== 0 ? acc : compareValue(orderRef.value, orderRef.dir, a, b)
        }, 0)
      }
    })
  const filteredPricesCatIds = [...new Set(filteredPrices.map((p: Price) => p.cat.id))]
  const selectedCats = displayedCats
    .filter((cat: Categorie) => cat.isOn)
    .filter((cat: Categorie) => filteredPricesCatIds.includes(cat.id))
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
  const isAllCatsChecked = displayedCats.filter((c: Categorie) => !c.isOn).length === 0
  const nbObjPerCats: NbObjPerCat[] = displayedCats.map((c: Categorie) => {
    const nbObj = prices.reduce(
      (acc: NbObjPerCat, p: Price): NbObjPerCat => {
        const nbActivatedObj = p.cat.id === c.id && p.template === 0 ? acc.nbActivatedObj + 1 : acc.nbActivatedObj
        const nbReservedObj = p.cat.id === c.id && p.template === 1 ? acc.nbReservedObj + 1 : acc.nbReservedObj
        const nbDeletedObj = p.cat.id === c.id && p.template === 2 ? acc.nbDeletedObj + 1 : acc.nbDeletedObj
        return {
          catId: c.id,
          nbActivatedObj,
          nbReservedObj,
          nbDeletedObj
        }
      }
      , {
        catId: -1,
        nbActivatedObj: 0,
        nbReservedObj: 0,
        nbDeletedObj: 0
      }
    )
    return nbObj
  })

  return {
    years,
    months,
    filteredPrices,
    displayedCats,
    selectedCats,
    isAllYearsChecked,
    isAllMonthsChecked,
    isAllCatsChecked,
    searchOptions,
    objects,
    categories,
    isAddOpen,
    priceInput,
    isLast,
    orderOptions,
    view,
    nbObjPerCats,
    objectInput,
    categoryInput
  }
}

const BoardViewContainer = connect(mapStateToProps)(BoardView)
export default BoardViewContainer

export const BoardViewContext = createContext<BoardViewProps>({
  years: [],
  months: [],
  filteredPrices: [],
  displayedCats: [],
  selectedCats: [],
  isAllYearsChecked: false,
  isAllMonthsChecked: false,
  isAllCatsChecked: false,
  searchOptions: initialSearchOption,
  objects: [],
  categories: [],
  priceInput: initialPriceInput,
  isAddOpen: false,
  isLast: false,
  orderOptions: initialOrderOptions,
  view: initialViewOption,
  nbObjPerCats: [],
  objectInput: initialObjectInput,
  categoryInput: initialCategoryInput
})

const sumPrices = (filteredPrices: Price[], cat: Categorie, sumType: SUM_TYPE): number => {
  const recettePrices = filteredPrices.filter((price: Price) => price.cat.id === cat.id && price.amount < 0 && price.template === 0)
  const depensePrices = filteredPrices.filter((price: Price) => price.cat.id === cat.id && price.amount > 0 && price.template === 0)
  const totalPrices = filteredPrices.filter((price: Price) => price.cat.id === cat.id && price.template === 0)
  const reservePrices = filteredPrices.filter((price: Price) => price.cat.id === cat.id && price.template === 1)

  const sumTypeMap: TitleAmountMapPrices = {
    'RECETTE': recettePrices,
    'DEPENSE': depensePrices,
    'RESERVE': reservePrices,
    'TOTAL': totalPrices
  }
  const prices: Price[] = (sumTypeMap)[sumType as SUM_TYPE]

  return prices.reduce((acc: number, price: Price): number => acc + price.amount, 0)
}

const compareValue = (sortCriteria: string, dir: ORDERDIR, a: Price, b: Price): number => {
  const critA = dir === 'ASC' ? a : b
  const critB = dir === 'ASC' ? b : a
  const sortDates = (a_: string, b_: string): number => formatDateYYYYMMDD(a_).localeCompare(formatDateYYYYMMDD(b_))
  return {
    'dateAction': sortDates(critA.actionDate, critB.actionDate),
    'obj': critA.obj.name.localeCompare(critB.obj.name),
    'price': critB.amount - critA.amount,
    'cat': critA.cat.name.localeCompare(critB.cat.name),
    'dateCreate': sortDates(critA.dateCreate, critB.dateCreate),
    'dateModif': sortDates(critA.dateCreate, critB.dateModif),
    'template': critA.template - critB.template
  }[sortCriteria] || 0
}