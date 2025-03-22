import { mockCats } from '../mocks/getCategories'
import { mockObjs } from '../mocks/getObjects'
import { mockYears } from '../mocks/getYears'
import { formatDate } from '../utils/helper'

export const mainReducer = (state = {}, action) => {
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1
  switch (action.type) {
    case '@@INIT': {
      return {
        prices: [],
        objects: mockObjs,
        categories: [
          {
            id: -1,
            catName: 'ERROR',
            template: 0,
            activated: false,
            filtered: false
          },
          ...mockCats
        ],
        years: mockYears.map(y => {
          return { year: y, filtered: y === currentYear }
        }),
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
        ].map((m, index) => {
          return {
            name: m,
            month: index + 1,
            filtered: index + 1 === currentMonth
          }
        }),

        filterOptions: {
          isMultipleYears: false,
          isMultipleMonths: false,
          isMultipleCats: true
        }
      }
    }

    case 'SET_PRICES': {
      const prices = action.payload.prices.map(p => {
        const obj_ = state.objects.filter(o => o.id === p.objectId)
        const obj =
          obj_.length === 0
            ? { objName: '*Error*', objectId: -1, catId: -1 }
            : obj_[0]

        const cat_ = state.categories.filter(c => c.id === obj.catId)
        const cat = cat_.length === 0 ? { catName: '*Error*', id: -1 } : cat_[0]

        return {
          ...p,
          actionDate: formatDate(p.actionDate),
          objectId: obj.objectId,
          objName: obj.objName,
          catId: cat.id,
          catName: cat.catName
        }
      })

      const activatedCatIds = [...new Set(prices.map(p => p.catId))]
      const categories = state.categories.map(cat => {
        return {
          ...cat,
          activated: activatedCatIds.includes(cat.id)
          // filtered: activatedCatIds.includes(cat.id)
        }
      })

      return {
        ...state,
        prices,
        categories
      }
    }

    case 'UPDATE_MONTH': {
      const { months, filterOptions } = state
      const { month, filtered } = action.payload
      const { isMultipleMonths } = filterOptions

      const selectedMonth = months.find(m => m.month === month)
      const activatedMonths = months.filter(m => m.filtered)

      if (!isMultipleMonths) {
        return {
          ...state,
          months: months.map(m => {
            return { ...m, filtered: m.month === month }
          })
        }
      }

      if (
        activatedMonths.length === 1 &&
        activatedMonths[0].month === selectedMonth.month
      ) {
        return state
      } else {
        return {
          ...state,
          months: months.map(m =>
            m.month === month ? { ...m, filtered: filtered } : m
          )
        }
      }
    }

    case 'UPDATE_YEAR': {
      const { years, filterOptions } = state
      const { year, filtered } = action.payload
      const { isMultipleYears } = filterOptions

      const selectedYear = years.find(y => y.year === year)
      const activatedYears = years.filter(y => y.filtered)

      if (!isMultipleYears) {
        return {
          ...state,
          years: years.map(y => {
            return { ...y, filtered: y.year === year }
          })
        }
      }

      if (
        activatedYears.length === 1 &&
        activatedYears[0].year === selectedYear.year
      ) {
        return state
      } else {
        return {
          ...state,
          years: years.map(y =>
            y.year === year ? { ...y, filtered: filtered } : y
          )
        }
      }
    }

    case 'UPDATE_ALL_YEARS': {
      const years = state.years.map(y => {
        return {
          ...y,
          filtered:
            y.year === currentYear ? true : action.payload.allYearsChecked
        }
      })

      return {
        ...state,
        years,
        filterOptions: {
          ...state.filterOptions,
          isMultipleYears: action.payload.allYearsChecked
        }
      }
    }
    case 'UPDATE_ALL_MONTHS': {
      const months = state.months.map(m => {
        return {
          ...m,
          filtered:
            m.month === currentMonth ? true : action.payload.allMonthsChecked
        }
      })

      return {
        ...state,
        months,
        filterOptions: {
          ...state.filterOptions,
          isMultipleMonths: action.payload.allMonthsChecked
        }
      }
    }

    case 'UPDATE_FILTERED_CAT': {
      const { checked, catId } = action.payload
      const categories = state.categories.map(c => {
        return {
          ...c,
          filtered:
            c.id === catId
              ? checked
              : state.filterOptions.isMultipleCats
              ? c.filtered
              : false
        }
      })
      return {
        ...state,
        categories
      }
    }

    case 'UPDATE_ALL_CATS': {
      const categories = state.categories.map(c => {
        return {
          ...c,
          filtered: action.payload
        }
      })
      return {
        ...state,
        categories,
        filterOptions: {
          ...state.filterOptions,
          isMultipleCats: action.payload
        }
      }
    }

    case 'UPDATE_MULTIPLE_YEARS': {
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          isMultipleYears: action.payload
        }
      }
    }

    case 'UPDATE_MULTIPLE_MONTHS': {
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          isMultipleMonths: action.payload
        }
      }
    }

    case 'UPDATE_MULTIPLE_CATS': {
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          isMultipleCats: action.payload
        }
      }
    }

    default:
      return state
  }
}
