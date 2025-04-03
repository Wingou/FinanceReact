import { catNone, objNone } from '../constants/constants'

export const formatDateFR = d => {
  return new Date(d).toLocaleDateString('fr-FR')
}

export const formatPrice = p => {
  return p === 0 || p === null ? '' : p.toFixed(2) + ' €'
}

export const formatPriceWithZero = p => {
  return p === null ? '' : p.toFixed(2) + ' €'
}

export const formatTextSQL = t => {
  return t.replace("'", "''")
}

export const formatPriceSQL = p => {
  return p.replace('.', ',')
}

export const getFirstObjId = (catId, objects) => {
  const objId =
    catId === -1
      ? objects.filter(o => o.template === 0)[0].id
      : objects
          .filter(o => o.catId === catId && o.template === 0)
          .sort((a, b) => a.objName.localeCompare(b.objName))[0].id

  return objId
}

export const getObjById = (objects, id) => {
  const obj = objects.filter(o => o.id === id)
  return obj.length === 0 ? objNone : obj[0]
}

export const getCatById = (categories, id) => {
  const cat = categories.filter(c => c.id === id)
  return cat.length === 0 ? catNone : cat[0]
}
