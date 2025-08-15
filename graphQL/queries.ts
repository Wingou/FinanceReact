
export const sqlPricesTop = `SELECT TOP ? id, prix, commentaire, DateAction, id_objet, dateCreate, dateModif, template FROM prix WHERE template=0 ORDER BY dateModif DESC`

export const sqlCategories = `SELECT id, Categorie, Ordre, template FROM categorie ORDER BY Ordre`

export const sqlObjects = `SELECT id, Objet, id_categorie, template FROM objet ORDER BY Objet`
export const sqlObjectById = `SELECT id, Objet, id_categorie, template FROM objet WHERE id=?`

export const sqlYears = `SELECT distinct year(dateAction) as year FROM prix ORDER BY year(dateAction) DESC`

export const sqlAddPrice = `INSERT INTO prix (prix, commentaire, DateAction, id_objet) VALUES (?,'?','?',?)`

export const sqlPricesByDates = `SELECT p.id as priceId, p.prix, p.commentaire, p.DateAction, p.dateCreate, p.dateModif, p.template as priceTemplate
                            , o.id as objId, o.Objet, o.template as objTemplate
                            , c.id as catId, c.categorie, c.Ordre, c.template as catTemplate
                            FROM prix p, objet o, categorie c
                            WHERE o.id_categorie = c.id
                            AND p.id_objet = o.id
                            AND Year(p.DateAction) in (?)
                            AND Month(p.DateAction) in (?)
                            ORDER BY p.DateAction, c.Ordre, o.Objet`

export const sqlPriceById = `SELECT p.id as priceId, p.prix, p.commentaire, p.DateAction, p.dateCreate, p.dateModif, p.template as priceTemplate
                            , o.id as objId, o.Objet, o.template as objTemplate
                            , c.id as catId, c.categorie, c.Ordre, c.template as catTemplate
                            FROM prix p, objet o, categorie c
                            WHERE p.id=? 
                            AND p.id_objet = o.id                          
                            AND o.id_categorie = c.id
                            ORDER BY p.DateAction, c.Ordre, o.Objet`


export const sqlLastPrices = `SELECT TOP 60 p.id as priceId, p.prix, p.commentaire, p.DateAction, p.dateCreate, p.dateModif, p.template as priceTemplate
                            , o.id as objId, o.Objet, o.template as objTemplate
                            , c.id as catId, c.categorie, c.Ordre, c.template as catTemplate
                            FROM prix p, objet o, categorie c
                            WHERE p.id_objet = o.id                          
                            AND o.id_categorie = c.id
                            ORDER BY p.dateModif DESC, p.DateAction DESC, c.Ordre, o.Objet`

export const sqlPriceCheck = `SELECT p.id as priceId, p.prix, p.commentaire, p.DateAction, p.dateCreate, p.dateModif, p.template as priceTemplate
                            , o.id as objId, o.Objet, o.template as objTemplate
                            , c.id as catId, c.categorie, c.Ordre, c.template as catTemplate
                            FROM prix p, objet o, categorie c
                            WHERE p.id_objet = o.id
                            AND o.id_categorie = c.id
                            AND o.template=0
                            AND p.template=0
                            AND p.prix=?
                            AND p.DateAction=#?#
                            AND o.id=?`

export const sqlIdent = `SELECT @@IDENTITY as id`

export const sqlModifPrice = `UPDATE prix set prix=?, commentaire='?', DateAction='?', id_objet=?, template=?, dateModif=Date() WHERE id=?`

export const sqlMostUsedObjects = `SELECT TOP 10 COUNT(p.id_objet) as nb, p.id_objet, o.Objet, o.id_categorie, c.categorie
                                    FROM prix p, objet o, categorie c
                                    WHERE o.id=p.id_objet 
                                    AND c.id=o.id_categorie
                                    AND p.template=0
                                    AND o.template=0
                                    AND c.template=0
                                    AND p.dateAction >=Date() - 100
                                    GROUP BY p.id_objet , o.Objet, o.id_categorie, c.categorie
                                    ORDER BY COUNT(p.id_objet) desc, o.Objet`

export const sqlAddObject = `INSERT INTO objet (Objet, id_categorie) VALUES ('?',?)`

export const sqlAddCategory = `INSERT INTO categorie (Categorie) VALUES ('?')`

export const sqlModifObject = `UPDATE objet SET Objet='?', template=? WHERE id=?`



