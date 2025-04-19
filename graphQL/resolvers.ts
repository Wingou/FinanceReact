import odbc from "odbc"
import { parseCategories, parseObjects, parseYears } from "./parsers.js"
import { sqlCategories, sqlObjects, sqlYears } from "./queries.js"
import { setParamInSQL } from "./utils.js"
import { CatRaw, ObjRaw, WhereObjets, YearRaw } from "./server.js"
import { CatGql, ObjGql, YearGql } from "../src/types/graphql.js"


const cnx = await odbc.connect('DSN=financereact')

export const resolvers = {
    Query: {
        categories: async () => {
            try {
                const rows = await cnx.query(setParamInSQL(sqlCategories, []))
                const result = parseCategories(rows as CatRaw[])
                return result as CatGql[]
            }
            catch (error) {
                console.error('Error sqlCategories')
                throw new Error('Impossible de récup categories')
            }
        },
        objects: async ({ where }: WhereObjets) => {
            try {
                const rows = await cnx.query(setParamInSQL(sqlObjects, []))
                const result = parseObjects(rows as ObjRaw[])
                if (!where) {
                    return result as ObjGql[]
                }
                else {
                    return result.filter(o => o.id === where.id || o.cat.id === where.catId)
                }
            }
            catch (error) {
                console.error('Error sqlObjects')
                throw new Error('Impossible de récup objets')
            }
        },
        years: async () => {
            try {
                const rows = await cnx.query(setParamInSQL(sqlYears, []))
                const result = parseYears(rows as YearRaw[])
                return result as YearGql[]
            }
            catch (error) {
                console.error('Error sqlObjects')
                throw new Error('Impossible de récup objets')
            }
        }
    }
}
