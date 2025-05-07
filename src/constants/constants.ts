import { Categorie } from "../types/common"

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

export type COY = 'CAT' | 'OBJ' | 'YEARS'
export type PAGE = 'HOME' | 'BOARD'

export type SUM_TYPE = 'RECETTE' | 'DEPENSE' | 'TOTAL' | 'RESERVE'

const catRawNone = { id: -1, name: 'NONE', position: 99, template: 0 }

export const objNone = {
  id: -1,
  name: 'NONE',
  template: 0,
  cat: catRawNone
}

export const catNone: Categorie = {
  ...catRawNone,
  recette: 0,
  depense: 0,
  reserve: 0,
  isDisplayed: false,
  isOn: false
}

export type CALLER = 'MODIF' | 'ADD'