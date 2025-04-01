const setPricesByDates = `SELECT id, prix, commentaire, DateAction, id_objet, dateCreate, dateModif, template FROM prix WHERE Year(DateAction) in (?) AND Month(DateAction) in (?) ORDER BY DateAction`

const setPricesTop = `SELECT TOP ? id, prix, commentaire, DateAction, id_objet, dateCreate, dateModif, template FROM prix WHERE template=0 ORDER BY dateModif DESC`

const setCategories = `SELECT id, Categorie, Ordre, template FROM categorie ORDER BY Ordre`

const setObjects = `SELECT id, Objet, id_categorie, template FROM objet ORDER BY Objet`

const setYears = `SELECT distinct year(dateAction) as year FROM prix ORDER BY year(dateAction) DESC`

const addPrice = `INSERT INTO prix (prix, commentaire, DateAction, id_objet) VALUES ('?','?','?',?)`
      

module.exports = {
  setPricesByDates,
  setPricesTop,
  setCategories,
  setObjects,
  setYears,
  addPrice
}
