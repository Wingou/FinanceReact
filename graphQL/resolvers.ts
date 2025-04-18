import odbc from "odbc"
import { parseCategories, parseObjects } from "./parsers.js"
import { sqlCategories, sqlObjects } from "./queries.js"
import { Cat, CatRaw, Obj, ObjRaw } from "./server.js"
import { setParamInSQL } from "./utils.js"

const cnx = await odbc.connect('DSN=financereact')

export const resolvers = {
    Query: {
        categories: async () => {
            try {
                const rows = await cnx.query(setParamInSQL(sqlCategories, []))
                const result = parseCategories(rows as CatRaw[])
                return result as Cat[]
            }
            catch (error) {
                console.error('Error sqlCategories')
                throw new Error('Impossible de récup categories')
            }
        },
        objects: async () => {
            try {
                const rows = await cnx.query(setParamInSQL(sqlObjects, []))
                const result = parseObjects(rows as ObjRaw[])
                return result as Obj[]
            }
            catch (error) {
                console.error('Error sqlObjects')
                throw new Error('Impossible de récup objets')
            }
        }
    }
}
