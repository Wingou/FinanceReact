export const CURRENT_YEAR = new Date().getFullYear()
export const CURRENT_MONTH = new Date().getMonth() + 1
export const CURRENT_DATE = new Date().toISOString().split('T')[0]

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

export const VIEW = {
  HOME: 'home',
  BOARD: 'board',
  ADD: 'add'
}

export const objNone = {  id: -1, catId: -1, objName: 'NONE',template: 0 }

export const catNone = {
  id: -1,
  catName: 'NONE',
  position: 99,
  template: 0,
  activated: false,
  filtered: false
}
