const selectPriceById = `SELECT id, prix, commentaire, DateAction FROM prix WHERE id=?  ORDER BY DateAction`

const selectPricesByPeriod = `SELECT id, prix, commentaire, DateAction FROM prix WHERE (DateAction>=#?# AND DateAction<=#?#) ORDER BY DateAction`

const selectPricesByYearMonth = `SELECT id, prix, commentaire, DateAction FROM prix WHERE Year(DateAction)=? AND Month(DateAction)=? ORDER BY DateAction`

module.exports = {
  selectPriceById,
  selectPricesByPeriod,
  selectPricesByYearMonth
}
