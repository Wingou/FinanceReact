function parseCategories (rows, _) {
  return {
    cat: rows.map(rs => {
      return {
        id: rs.id,
        catName: rs.Categorie,
        position:rs.Ordre,
        template: rs.template
      }
    })
  }
}

function parseObjects (rows, _) {
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

function parseYears (rows, _) {
  return { years: rows.map(rs => rs.year) }
}

function parsePrices (rows, _) {
  const newRows = rows.map(rs => {
    return {
      id: rs.id,
      priceValue: rs.prix,
      actionDate: rs.DateAction,
      comment: rs.commentaire,
      objId: rs.id_Objet,
      template: rs.template,
      dateCreate: rs.dateCreate,
      dateModif: rs.dateModif
    }
  })

  const result = {
    prices: newRows
  }

  return result
}


function parseAddPrice (rows, _) {
  console.log("Rows : ", rows)
  return { rs : rows }
}


module.exports = {
  parsePrices,
  parseCategories,
  parseObjects,
  parseYears,
  parseAddPrice
}
