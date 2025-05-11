import { catNone, objNone } from '../types/constants'
import { Categorie, Object } from '../types/common'

export const formatDateFR = (d: string) => {
  return new Date(d).toLocaleDateString('fr-FR')
}

export const formatCalendarDate = (d: string) => {
  const newDate = new Date(d)
  const yyyy = newDate.getFullYear()
  const m_ = newDate.getMonth() + 1
  const d_ = newDate.getDate()

  const mm = m_ < 10 ? `0${m_}` : m_
  const day = d_ < 10 ? `0${d_}` : d_

  return yyyy + '-' + mm + '-' + day
}

export const formatPrice = (p: number) => {
  return p === 0 || p === null ? '' : p.toFixed(2) + ' €'
}

export const formatPriceWithZero = (p: number) => {
  return p === null ? '' : p.toFixed(2) + ' €'
}

export const formatTextSQL = (t: string) => {
  return t.replace("'", "''")
}

export const getFirstObjId = (catId: number, objects: Object[]) => {
  const objId =
    catId === -1
      ? objects.filter(o => o.template === 0)[0].id
      : objects
        .filter(o => o.cat.id === catId && o.template === 0)
        .sort((a, b) => a.name.localeCompare(b.name))[0].id

  return objId
}

export const getObjById = (objects: Object[], id: number): Object => {
  const obj = objects.filter(o => o.id === id)
  return obj.length === 0 ? objNone : obj[0]
}

export const getCatById = (categories: Categorie[], id: number): Categorie => {
  const cat = categories.filter(c => c.id === id)
  return cat.length === 0 ? catNone : cat[0]
}
