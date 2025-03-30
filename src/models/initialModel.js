import { CURRENT_MONTH, MONTHS, VIEW } from "../constants/constants"



export const initialModel = {
        prices: [],
        objects: [],
        categories: [],
        years: [],
        months: MONTHS.map((m, index) => {
          return {
            name: m,
            month: index + 1,
            filtered: index + 1 === CURRENT_MONTH
          }
        }),
        filterOptions: {
          isMultiYears: false,
          isMultiMonths: false,
          isMultiCats: true,
          searchWord: '',
          searchMin: null,
          searchMax: null
        },
        view : VIEW.HOME
      }

 