import { CatGql, ObjGql, YearGql } from "../src/types/graphql.js"
import { CatRaw, ObjRaw, YearRaw } from "./server.js"

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
    return rows.map((rs:ObjRaw):ObjGql  => {
        return {
            id: rs.id.toString(),
            name: rs.Objet,
            template: rs.template,
            cat: {
                id: rs.id_categorie.toString()
            }
        }
    })
}


export const parseYears =  (rows: YearRaw[]):YearGql[] => {
  return rows.map(rs => {return { name : rs.year}})
}
