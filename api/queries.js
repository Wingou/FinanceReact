const selectPriceById = `SELECT id, prix, commentaire, DateAction FROM prix WHERE id=?  ORDER BY DateAction`

const selectPricesByPeriod = `SELECT id, prix, commentaire, DateAction FROM prix WHERE (DateAction>=#?# AND DateAction<=#?#) ORDER BY DateAction`

const selectPricesByYearMonth = `SELECT id, prix, commentaire, DateAction, id_Objet, template FROM prix WHERE Year(DateAction)=? AND Month(DateAction)=? ORDER BY DateAction`

const getCategories = `SELECT id, Categorie, template FROM categorie ORDER BY Ordre`

const getObjects = `SELECT id, Objet, id_categorie, template FROM objet ORDER BY Objet`

module.exports = {
  selectPriceById,
  selectPricesByPeriod,
  selectPricesByYearMonth,
  getCategories,
  getObjects
}
