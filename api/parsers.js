function parseCategories (rows) {
  return rows.map(rs => {
    return {
      id: rs.id,
      name: rs.Categorie,
      position: rs.Ordre,
      template: rs.template
    }
  })
}

function parseObjects (rows) {
  return rows.map(rs => {
    return {
      id: rs.id,
      name: rs.Objet,
      template: rs.template,
      cat: {
        id: rs.id_categorie
      }
    }
  })
}

function parseYears (rows) {
  return rows.map(rs => rs.year)
}

function parseAddPrice (rows) {
  return rows
}

function parsePrices (rows) {
  return rows.map(rs => {
    return {
      id: rs.priceId,
      amount: rs.prix,
      comment: rs.commentaire,
      actionDate: rs.DateAction,
      dateCreate: rs.dateCreate,
      dateModif: rs.dateModif,
      template: rs.priceTemplate,
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
}

module.exports = {
  parsePrices,
  parseCategories,
  parseObjects,
  parseYears,
  parseAddPrice
}
