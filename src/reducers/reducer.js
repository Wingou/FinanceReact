import { mockCats } from '../mocks/getCategories'
import { mockObjs } from '../mocks/getObjects'
import { mockYears } from '../mocks/getYears'
import { formatDate } from '../utils/helper'

export const mainReducer = (state = {}, action) => {
  switch (action.type) {
    case '@@INIT':
      {
      const currentYear = new Date().getFullYear()
      const currentMonth = new Date().getMonth()+1
      return {
        prices: [],
        objects: mockObjs,
        categories: mockCats,
        years: mockYears.map((y)=> {return { year:y, filtered: y===currentYear }}),
        months: [
          'Janvier',
          'Février',
          'Mars',
          'Avril',
          'Mai',
          'Juin',
          'Juillet',
          'Août',
          'Septembre',
          'Octobre',
          'Novembre',
          'Décembre'
        ].map((m, index)=> {return { name : m, month:index+1, filtered:index+1===currentMonth}})
      }}

    case 'SET_PRICES': {
      const prices = action.payload.prices.map(p => {
        const obj = state.objects.find(o => o.id === p.objectId)
        const cat = state.categories.find(c => obj.catId === c.id)
        return {
          ...p,
          actionDate: formatDate(p.actionDate),
          objName: obj.objName,
          catName: cat.catName,
          catId: cat.id
        }
      })
      const activatedCatIds = [...new Set(prices.map(p => p.catId))]
      const categories = state.categories.map(cat => {
        return {
          ...cat,
          activated: activatedCatIds.includes(cat.id),
          filtered: activatedCatIds.includes(cat.id)
        }
      })

      
      
      return {
        ...state,
        prices,
        categories
      }
    }

    case 'UPDATE_MONTH': {
      return {
        ...state,
        selectedMonth: action.payload
      }
    }

    case 'UPDATE_YEAR': {
      return {
        ...state,
        selectedYear: action.payload
      }
    }

    case 'UPDATE_FILTERED_CAT': {
      const { checked, catId } = action.payload
      const categories = state.categories.map(c => {
        return {
          ...c,
          filtered: c.id === catId ? checked : c.filtered
        }
      })
      return {
        ...state,
        categories
      }
    }

    default:
      return state
  }
}
