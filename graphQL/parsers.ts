import { Cat, CatRaw, ObjRaw, Year, YearRaw } from "./server.js"

export const parseCategories = (rows: CatRaw[]): Cat[] => {
    return rows.map((rs: CatRaw): Cat => {
        return {
            id: rs.id,
            name: rs.Categorie,
            position: rs.Ordre,
            template: rs.template
        }
    })
}

export const parseObjects = (rows: ObjRaw[]) => {
    return rows.map(rs => {
        return {
            id: rs.id,
            name: rs.Objet,
            template: rs.template,
            cat: {
                id: rs.id_categorie
            }
        }
    })
}


export const parseYears =  (rows: YearRaw[]):Year[] => {
  return rows.map(rs => {return { name : rs.year}})
}
