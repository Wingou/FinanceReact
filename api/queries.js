const selectPricesByDates = `SELECT id, prix, commentaire, DateAction, id_Objet, dateCreate, dateModif, template FROM prix WHERE Year(DateAction) in (?) AND Month(DateAction) in (?) ORDER BY DateAction`

const getCategories = `SELECT id, Categorie, Ordre, template FROM categorie ORDER BY Ordre`

const getObjects = `SELECT id, Objet, id_categorie, template FROM objet ORDER BY Objet`

const getYears = `SELECT distinct year(dateAction) as year FROM prix ORDER BY year(dateAction) DESC`

const addPrice = `INSERT INTO prix (prix, commentaire, DateAction, id_Objet) VALUES ('?','?','?',?)`
      

module.exports = {
  selectPricesByDates,
  getCategories,
  getObjects,
  getYears,
  addPrice
}
