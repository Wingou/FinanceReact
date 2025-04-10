const date = new Date()

export const CURRENT_YEAR = date.getFullYear()
export const CURRENT_MONTH = date.getMonth() + 1
export const CURRENT_DATE = date.toISOString().split('T')[0]
export const CURRENT_DATE_TIME =
  CURRENT_DATE + ' ' + date.toISOString().split('T')[1].slice(0, 8)

export const CATEGORIES = 'categories'
export const OBJECTS = 'objects'
export const YEARS = 'years'
export const MONTHS = [
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
]

export type COY =  'CAT' | 'OBJ' | 'YEARS'
export type VIEW = 'HOME' | 'BOARD' | 'ADD'

export type SUM_TYPE = 'RECETTE' | 'DEPENSE' | 'TOTAL'



export const objNone = { id: -1, catId: -1, objName: 'NONE', template: 0, catName: 'NONE' }

export const catNone = {
  id: -1,
  catName: 'NONE',
  position: 99,
  template: 0,
  activated: false,
  filtered: false
}
