import odbc from "odbc"
import { parseCategories, parseObjects, parsePrices, parseYears } from "./parsers.js"
import { sqlCategories, sqlObjects, sqlPricesByDates, sqlYears } from "./queries.js"
import { setParamInSQL } from "./utils.js"
import { CatRaw, ObjRaw, PriceRaw, YearRaw } from "./server.js"
import { CatGql, ObjectsWhereInput, ObjGql, PriceGql, PricesByDatesWhereInput, YearGql } from "../src/types/graphql.js"

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
                console.error('Error resolver categories')
                throw new Error('Error resolver categories')
            }
        },
        objects: async ({ where }: { where?: ObjectsWhereInput }) => {
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
                console.error('Error resolver objects')
                throw new Error('Error resolver objects')
            }
        },
        years: async () => {
            try {
                const rows = await cnx.query(setParamInSQL(sqlYears, []))
                const result = parseYears(rows as YearRaw[])
                return result as YearGql[]
            }
            catch (error) {
                console.error('Error resolver years')
                throw new Error('Error resolver years')
            }
        },
        pricesByDates: async ({ where }: { where: PricesByDatesWhereInput }) => {
            const { years, months } = where
            try {
                const rows = await cnx.query(setParamInSQL(sqlPricesByDates, [years, months]))
                const result = parsePrices(rows as PriceRaw[])
                return result as PriceGql[]
            }
            catch (error) {
                console.error('Error resolver pricesByDates')
                throw new Error('Error resolver pricesByDates')
            }
        },
    }
}
