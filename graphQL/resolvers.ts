import odbc, { Result } from "odbc"
import { parseCategories, parseObjects, parsePrices, parseYears } from "./parsers.js"
import { sqlAddPrice, sqlCategories, sqlIdent, sqlObjects, sqlPriceById, sqlPricesByDates, sqlYears } from "./queries.js"
import { setParamInSQL } from "./utils.js"
import { CatRaw, ObjRaw, PriceRaw, YearRaw } from "./server.js"
import { AddPriceInsertInput, CatGql, ObjectsWhereInput, ObjGql, PriceGql, PricesByDatesWhereInput, PriceByIdWhereInput, YearGql, ModifPriceUpdateInput } from "../src/types/graphql.js"

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
        objects: async (_: any, { where }: { where?: ObjectsWhereInput }) => {
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
        pricesByDates: async (_: any, { where }: { where: PricesByDatesWhereInput }) => {
            const { years, months } = where
            try {
                const rows = await cnx.query(setParamInSQL(sqlPricesByDates, [years, months]))
                const result = parsePrices(rows as PriceRaw[])
                console.log("SQL:", result)
                return result as PriceGql[]

            }
            catch (error) {
                console.error('Error resolver pricesByDates')
                throw new Error('Error resolver pricesByDates')
            }
        },
        priceById: async (_: any, { where }: { where: PriceByIdWhereInput }) => {
            const { id } = where
            try {
                const rows = await cnx.query(setParamInSQL(sqlPriceById, [id]))
                const result = parsePrices(rows as PriceRaw[])
                return result as PriceGql[]
            }
            catch (error) {
                console.error('Error resolver pricesByDates')
                throw new Error('Error resolver pricesByDates')
            }
        },
    },
    Mutation: {
        addPrice: async (_: any, { insert }: { insert: AddPriceInsertInput }) => {
            try {
                const { amount, comment, actionDate, objId } = insert
                await cnx.query(setParamInSQL(sqlAddPrice, [amount, comment, actionDate, objId]))
                const res = await cnx.query(sqlIdent) as Result<{ id: string }>
                const priceId_ = res[0].id
                const rows = await cnx.query(setParamInSQL(sqlPriceById, [priceId_]))
                const result = parsePrices(rows as PriceRaw[])
                return result[0] as PriceGql
            }
            catch (error) {
                console.error('Error resolver addPrice')
                throw new Error('Error resolver addPrice')
            }
        },
        modifPrice: async (_: any, { update }: { update: ModifPriceUpdateInput }) => {
            try {
                const { amount, comment, actionDate, objId, id } = update
                await cnx.query(setParamInSQL(sqlAddPrice, [amount, comment, actionDate, objId, id]))

                console.log("sql back:", setParamInSQL(sqlPriceById, [id]))
                const rows = await cnx.query(setParamInSQL(sqlPriceById, [id]))
                const result = parsePrices(rows as PriceRaw[])
                return result[0] as PriceGql
            }
            catch (error) {
                console.error('Error resolver addPrice')
                throw new Error('Error resolver addPrice')
            }
        }
    }
}
