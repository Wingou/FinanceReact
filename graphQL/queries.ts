
export const sqlPricesTop = `SELECT TOP ? id, prix, commentaire, DateAction, id_objet, dateCreate, dateModif, template FROM prix WHERE template=0 ORDER BY dateModif DESC`

export const sqlCategories = `SELECT c.id, c.Categorie, c.Ordre, c.template, count(o.id_categorie) as nbChild
                                    FROM categorie c LEFT JOIN objet o ON c.id=o.id_categorie
                                    WHERE  o.template=0 OR o.template is null
                                    GROUP BY  c.id, c.Categorie, c.Ordre, c.template
                                    ORDER BY c.Ordre`
export const sqlCategoryById = `SELECT id, Categorie, Ordre, template FROM categorie WHERE id=?`

export const sqlObjects = `SELECT o.id, o.Objet, o.id_categorie, o.template, count(p.id_objet) as nbChild
                                FROM objet o LEFT JOIN  prix p ON p.id_objet= o.id
                                WHERE p.template=2 OR p.template =0 OR p.template is NULL
                                GROUP BY o.id, o.Objet, o.id_categorie, o.template 
                                ORDER BY o.Objet`
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

export const sqlAddObject = `INSERT INTO objet (Objet, id_categorie) VALUES ('?',?)`

export const sqlAddCategory = `INSERT INTO categorie (Categorie) VALUES ('?')`

export const sqlModifObject = `UPDATE objet SET Objet='?' WHERE id=?`
export const sqlDelObject = `UPDATE objet SET template=? WHERE id=?`

export const sqlModifCategory = `UPDATE categorie SET Categorie='?', Ordre=?, Template=? WHERE id=?`


