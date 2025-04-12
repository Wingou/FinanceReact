
const setPricesTop = `SELECT TOP ? id, prix, commentaire, DateAction, id_objet, dateCreate, dateModif, template FROM prix WHERE template=0 ORDER BY dateModif DESC`

const setCategories = `SELECT id, Categorie, Ordre, template FROM categorie ORDER BY Ordre`

const setObjects = `SELECT id, Objet, id_categorie, template FROM objet ORDER BY Objet`

const setYears = `SELECT distinct year(dateAction) as year FROM prix ORDER BY year(dateAction) DESC`

const addPrice = `INSERT INTO prix (prix, commentaire, DateAction, id_objet) VALUES ('?','?','?',?)`

const setPricesByDates = `SELECT p.id as priceId, p.prix, p.commentaire, p.DateAction, p.dateCreate, p.dateModif, p.template as priceTemplate
                            , o.id as objId, o.Objet, o.template as objTemplate
                            , c.id as catId, c.categorie, c.Ordre, c.template as catTemplate
                                    FROM prix p, objet o, categorie c
                                    WHERE Year(p.DateAction) in (?)
                                    AND Month(p.DateAction) in (?)
                                    AND o.id = p.id_objet  
                                    AND c.id = o.id_categorie  
                                    ORDER BY DateAction`

// const setPricesBySearch = `SELECT p.id as priceId, p.prix, p.commentaire, p.DateAction, p.dateCreate, p.dateModif, p.template as priceTemplate
//                             , o.id as objId, o.Objet, o.template as objTemplate
//                             , c.id as catId, c.categorie, c.Ordre, c.template as catTemplate
//                             FROM prix p, objet o, categorie c
//                             WHERE c.id in (?)
//                             AND o.id_categorie = c.id
//                             AND p.id_objet = o.id
//                             AND Year(p.DateAction) in (?)
//                             AND Month(p.DateAction) in (?)
//                             ORDER BY p.DateAction, c.Ordre, o.Objet`

module.exports = {
  setPricesByDates,
  setPricesTop,
  setCategories,
  setObjects,
  setYears,
  addPrice
}
