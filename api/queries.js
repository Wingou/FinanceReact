const selectPriceById = `SELECT id, prix, commentaire, DateAction FROM prix WHERE id=?  ORDER BY DateAction`

const selectPricesByPeriod = `SELECT id, prix, commentaire, DateAction FROM prix WHERE (DateAction>=#?# AND DateAction<=#?#) ORDER BY DateAction`

const selectPricesByDates = `SELECT id, prix, commentaire, DateAction, id_Objet, template FROM prix WHERE Year(DateAction) in (?) AND Month(DateAction) in (?) ORDER BY DateAction`

const getCategories = `SELECT id, Categorie, template FROM categorie ORDER BY Ordre`

const getObjects = `SELECT id, Objet, id_categorie, template FROM objet ORDER BY Objet`

const getYears = `SELECT distinct year(dateAction) as year FROM prix ORDER BY year(dateAction) DESC`

module.exports = {
  selectPriceById,
  selectPricesByPeriod,
  selectPricesByDates,
  getCategories,
  getObjects,
  getYears
}
