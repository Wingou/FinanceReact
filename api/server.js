/* eslint-disable no-undef */
require('dotenv').config()
const { dateForSQL, setParamInSQL } = require('./utils.js')
const http = require('http')
const odbc = require('odbc')
const url = require('url')
const {
  selectPriceById,
  selectPricesByPeriod,
  selectPricesByDates,
  getCategories,
  getObjects,
  getYears
} = require('./queries')
const {
  parsePricesByDates,
  parseCategories,
  parseObjects,
  parseYears
} = require('./parsers')

async function connectAndCall (req, res, data) {
  const cnx = await odbc.connect('DSN=financereact')
  const parsedUrl = url.parse(req.url, true)
  const query_ = parsedUrl.query
  const path_ = parsedUrl.pathname
  try {
    let sql
    let params
    if (req.method === 'GET') {
      if (path_ === '/price') {
        // http://localhost:3001/price?id=15333
        sql = selectPriceById
        params = [query_.id]
      } else if (path_ === '/pricesbyperiod') {
        // http://localhost:3001/pricesbyperiod?beginDate=20250115&endDate=20250215
        const beginDate_ = dateForSQL(query_.beginDate)
        const endDate_ = dateForSQL(query_.endDate)
        sql = selectPricesByPeriod
        params = [beginDate_, endDate_]
      } else if (path_ === '/pricesByDates') {
        // http://localhost:3001/pricesByDates?years=2025,2024&months=1,2,3
        const years_ = query_.years
        const months_ = query_.months
        sql = selectPricesByDates
        params = [years_, months_]
        parser = parsePricesByDates
      } else if (path_ === '/getCategories') {
        // http://localhost:3001/getCategories
        sql = getCategories
        params = []
        parser = parseCategories
      } else if (path_ === '/getObjects') {
        // http://localhost:3001/getObjects
        params = []
        sql = getObjects
        parser = parseObjects
      } else if (path_ === '/getYears') {
        // http://localhost:3001/getYears
        params = []
        sql = getYears
        parser = parseYears
      }
    }
    if (path_ === '/favicon.ico') {
      res.writeHead(200, { 'Content-Type': 'image/x-icon' })
      return res.end()
    }
    const rows = await cnx.query(setParamInSQL(sql, params))
    const result = await parser(rows, params)
    const jsonData = JSON.stringify(result)
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    await res.end(jsonData)
  } catch (error) {
    console.error(error)
  } finally {
    cnx.close()
  }
}

const port = process.env.PORT
const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    res.statusCode = 200
    res.end()
  } else if (req.method === 'GET') {
    await connectAndCall(req, res, null)
  } else if (req.method === 'POST') {
    req.on('data', async data => {
      await connectAndCall(req, res, JSON.parse(data))
    })
    req.on('end', () => {})
  }
})

server.listen(port, () => {
  console.log('listening... on ' + port)
})
