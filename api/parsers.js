function parseCategories (rows) {
  return {
    cat: rows.map(rs => {
      return {
        id: rs.id,
        catName: rs.Categorie,
        position: rs.Ordre,
        template: rs.template
      }
    })
  }
}

function parseObjects (rows) {
  return {
    obj: rows.map(rs => {
      return {
        id: rs.id,
        catId: rs.id_categorie,
        objName: rs.Objet,
        template: rs.template
      }
    })
  }
}

function parseYears (rows) {
  return { years: rows.map(rs => rs.year) }
}

function parseAddPrice (rows) {
  return { rs: rows }
}

function parsePrices (rows) {
  const newRows = rows.map(rs => {
    return {
      price: {
        id: rs.priceId,
        priceValue: rs.prix,
        comment: rs.commentaire,
        actionDate: rs.DateAction,
        dateCreate: rs.dateCreate,
        dateModif: rs.dateModif,
        template: rs.priceTemplate
      },
      obj: {
        id: rs.objId,
        name: rs.Objet,
        template: rs.objTemplate
      },
      cat: {
        id: rs.catId,
        name: rs.categorie,
        position: rs.Ordre,
        template: rs.catTemplate
      }
    }
  })

  const result = {
    prices: newRows
  }

  return result
}

module.exports = {
  parsePrices,
  parseCategories,
  parseObjects,
  parseYears,
  parseAddPrice
}
