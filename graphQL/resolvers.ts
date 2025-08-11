import odbc, { Result } from "odbc"
import { parseCategories, parseMostUsedObjects, parseObjects, parsePrices, parseYears } from "./parsers.js"
import { sqlAddObject, sqlAddPrice, sqlCategories, sqlIdent, sqlLastPrices, sqlModifObject, sqlModifPrice, sqlMostUsedObjects, sqlObjectById, sqlObjects, sqlPriceById, sqlPriceCheck, sqlPricesByDates, sqlYears } from "./queries.js"
import { setParamInSQL } from "./utils.js"
import { CatRaw, MostUsedObjectsRaw, ObjRaw, PriceRaw, YearRaw } from "./server.js"
import { AddPriceInsertInput, CatGql, ObjectsWhereInput, ObjGql, PriceGql, PricesByDatesWhereInput, PriceByIdWhereInput, PriceCheckWhereInput, YearGql, ModifPriceUpdateInput, MostUsedObjectGql, AddObjectInsertInput, ModifObjectInput } from "./types/graphql.js"
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
                console.error('Error resolver pricesById')
                throw new Error('Error resolver pricesById')
            }
        },
        lastPrices: async () => {
            try {
                const rows = await cnx.query(setParamInSQL(sqlLastPrices, []))
                const result = parsePrices(rows as PriceRaw[])
                return result as PriceGql[]
            }
            catch (error) {
                console.error('Error resolver lastPrices')
                throw new Error('Error resolver lastPrices')
            }
        },
        mostUsedObjects: async () => {
            try {
                const rows = await cnx.query(setParamInSQL(sqlMostUsedObjects, []))
                const result = parseMostUsedObjects(rows as MostUsedObjectsRaw[])
                return result as MostUsedObjectGql[]
            }
            catch (error) {
                console.error('Error resolver mostUsedObjects')
                throw new Error('Error resolver mostUsedObjects')
            }
        },
        priceCheck: async (_: any, { where }: { where: PriceCheckWhereInput }) => {
            try {
                const { amount, actionDate, objId } = where
                const rows = await cnx.query(setParamInSQL(sqlPriceCheck, [amount, actionDate, objId]))
                const result = parsePrices(rows as PriceRaw[])
                return result
            }
            catch (error) {
                console.error('Error resolver priceCheck', error)
                throw new Error('Error resolver priceCheck')
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
                const { amount, comment, actionDate, objId, template, id } = update
                await cnx.query(setParamInSQL(sqlModifPrice, [amount, comment, actionDate, objId, template, id]))
                const rows = await cnx.query(setParamInSQL(sqlPriceById, [id]))
                const result = parsePrices(rows as PriceRaw[])
                return result[0] as PriceGql
            }
            catch (error) {
                console.error('Error resolver modifPrice')
                throw new Error('Error resolver modifPrice')
            }
        },
        addObject: async (_: any, { insert }: { insert: AddObjectInsertInput }) => {
            try {
                const { objName, catId } = insert
                await cnx.query(setParamInSQL(sqlAddObject, [objName, catId]))
                const res = await cnx.query(sqlIdent) as Result<{ id: string }>
                return {
                    id: res[0].id,
                    name: objName,
                    cat: { id: catId }
                } as ObjGql
            }
            catch (error) {
                console.error('Error resolver addObject')
                throw new Error('Error resolver addObject')
            }
        },
        modifObject: async (_: any, { update }: { update: ModifObjectInput }) => {
            try {
                const { objName, template, id } = update
                await cnx.query(setParamInSQL(sqlModifObject, [objName, template, id]))


                const rows = await cnx.query(setParamInSQL(sqlObjectById, [id]))
                const result = parseObjects(rows as ObjRaw[])
                return result[0] as ObjGql


            }
            catch (error) {
                console.error('Error resolver modifObject')
                throw new Error('Error resolver modifObject')
            }
        }
    }
}
