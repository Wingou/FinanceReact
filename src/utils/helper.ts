import { catNone, objNone, TEMPLATE } from '../types/constants'
import { Categorie, Object } from '../types/common'

export const formatDateDisplayMonthYear = (d_: string) => {
  const [yearA, monthA] = d_.split('-');
  const dateA = `${monthA}/${yearA}`;
  return dateA;
}

export const formatDateDisplayYear = (d_: string) => {
  const [yearA] = d_.split('-');
  const dateA = yearA;
  return dateA;
}

export const formatFirstDay = (d_: string) => {
  const [yearA, monthA] = d_.split('-');
  const dateA = `${yearA}-${monthA}-01 00:00:00`;
  return dateA;
}

export const formatFirstMonth = (d_: string) => {
  const [yearA] = d_.split('-');
  const dateA = `${yearA}-01-01 00:00:00`;
  return dateA;
}

export const formatDateYYYYMMDD = (d: string): string => {
  const [dayA, monthA, yearA] = d.split('/');
  const dateA = `${yearA}${monthA}${dayA}`;
  return dateA;
}

export const formatDateFR = (d: string) => {
  return new Date(d).toLocaleDateString('fr-FR')
}

export const formatTemplate = (t: number): TEMPLATE => {
  const tMapTemplate: TEMPLATE[] = [
    'ACTIVATED',
    'RESERVED',
    'DELETED',
  ]
  return tMapTemplate[t] || 'PREFERED'
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

export const getTopObjs = (objects: Object[], nb: number): Object[] => {
  const excludeCatIds = [39]
  return objects
    .filter((o: Object) => o.template !== 2 && !excludeCatIds.includes(o.cat.id))
    .sort((a: Object, b: Object) => b.nbChild - a.nbChild)
    .slice(0, nb)
}