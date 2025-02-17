require('dotenv').config()
const { dateForSQL, setParamInSQL } = require('./utils.js')
const http = require('http')
const odbc = require('odbc')
const url = require('url')

const {
  selectPriceById,
  selectPricesByPeriod,
  selectPricesByYearMonth
} = require('./queries')

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
      } else if (path_ === '/pricesByMonthYear') {
        // http://localhost:3001/pricesByMonthYear?year=2025&month=01

        const year_ = dateForSQL(query_.year)
        const month_ = dateForSQL(query_.month)

        sql = selectPricesByYearMonth
        params = [year_, month_]
      }
    }
    if (path_ === '/favicon.ico') {
      res.writeHead(200, { 'Content-Type': 'image/x-icon' })
      return res.end()
    }
    const rows = await cnx.query(setParamInSQL(sql, params))
    const newRows = rows.map(res => {
      const prix = {
        prix: res.prix,
        commentaire: res.commentaire,
        dateAction: res.DateAction
      }

      const result = {
        id: res.id,
        prix
      }
      return result
    })
    const jsonData = JSON.stringify(newRows)
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(jsonData)
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
