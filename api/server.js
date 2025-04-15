require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const odbc = require('odbc')
const url = require('url')
const { setParamInSQL } = require('./utils.js')
const {
  setCategories,
  setObjects,
  setYears,
  addPrice,
  setPricesTop,
  setPricesByDates
} = require('./queries')
const {
  parsePrices,
  parseCategories,
  parseObjects,
  parseYears,
  parseAddPrice
} = require('./parsers')

const app = express()
const port = process.env.PORT || 3001

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use(bodyParser.json())

async function connectAndQuery (sql, sqlparams) {
  let cnx
  try {
    cnx = await odbc.connect('DSN=financereact')
    const result = await cnx.query(setParamInSQL(sql, sqlparams))
    return result
  } catch (error) {
    console.error('DB Connection Error:', error)
    throw error
  } finally {
    if (cnx) {
      await cnx.close()
    }
  }
}

app.get('/pricesTop', async (req, res) => {
  const { top } = req.query
  const sql = setPricesTop
  const sqlparams = [top]
  const parser = parsePrices
  try {
    const rows = await connectAndQuery(sql, sqlparams)
    const result = await parser(rows)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: 'GET /pricesTop Error' })
  }
})

app.get('/setCategories', async (req, res) => {
  const sql = setCategories
  const sqlparams = []
  const parser = parseCategories
  try {
    const rows = await connectAndQuery(sql, sqlparams)
    const result = await parser(rows)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: 'GET /setCategories Error' })
  }
})

app.get('/setObjects', async (req, res) => {
  const sql = setObjects
  const sqlparams = []
  const parser = parseObjects
  try {
    const rows = await connectAndQuery(sql, sqlparams)
    const result = await parser(rows)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: 'GET /setObjects Error' })
  }
})

app.get('/setYears', async (req, res) => {
  const sql = setYears
  const sqlparams = []
  const parser = parseYears
  try {
    const rows = await connectAndQuery(sql, sqlparams)
    const result = await parser(rows)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: 'GET /setYears Error' })
  }
})

app.get('/pricesByDates', async (req, res) => {
  const { years, months } = req.query
  const sql = setPricesByDates
  const sqlparams = [years, months]
  const parser = parsePrices
  try {
    const rows = await connectAndQuery(sql, sqlparams)
    const result = await parser(rows)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: 'GET /pricesByDates Error' })
  }
})

app.post('/addPrice', async (req, res) => {
  const { price, comment, actionDate, objId } = req.body
  const sql = addPrice
  const sqlparams = [`${price}`, `${comment}`, `${actionDate}`, objId]
  const parser = parseAddPrice
  try {
    await connectAndQuery(sql, sqlparams)
    const sqlIdResult = await odbc
      .connect('DSN=financereact')
      .then(cnx =>
        cnx.query(`SELECT @@IDENTITY as id`).finally(() => cnx.close())
      )
    const insertedId = sqlIdResult[0]?.id
    const result = await parser(insertedId)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({ error: 'POST /addPrice Error' })
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
