import { CatGql, ObjGql, PriceGql, YearGql } from "./types/graphql.js"
import { CatRaw, ObjRaw, PriceRaw, YearRaw } from "./server.js"

export const parseCategories = (rows: CatRaw[]): CatGql[] => {
  return rows.map((rs: CatRaw): CatGql => {
    return {
      id: rs.id.toString(),
      name: rs.Categorie,
      position: rs.Ordre,
      template: rs.template
    }
  })
}

export const parseObjects = (rows: ObjRaw[]) => {
  return rows.map((rs: ObjRaw): ObjGql => {
    return {
      id: rs.id.toString(),
      name: rs.Objet,
      template: rs.template,
      cat: {
        id: rs.id_categorie.toString()
      },
      nbChild: rs.nbChild
    }
  })
}

export const parseYears = (rows: YearRaw[]): YearGql[] => {
  return rows.map(rs => { return { name: rs.year } })
}

export const parsePrices = (rows: PriceRaw[]): PriceGql[] => {
  return rows.map(rs => {
    return {
      id: rs.priceId.toString(),
      amount: rs.prix.toString(),
      comment: rs.commentaire ? rs.commentaire : '',
      actionDate: rs.DateAction,
      dateCreate: rs.dateCreate,
      dateModif: rs.dateModif,
      template: rs.priceTemplate,
      obj: {
        id: rs.objId.toString(),
        name: rs.Objet,
        template: rs.objTemplate
      },
      cat: {
        id: rs.catId.toString(),
        name: rs.categorie,
        position: rs.Ordre,
        template: rs.catTemplate
      }
    }
  })
}