function parseCategories (rows, _) {
  return {
    categories: rows.map(res => {
      return {
        id: res.id,
        category: res.Categorie,
        template: res.template
      }
    })
  }
}

function parseObjects (rows, _) {
  return {
    objects: rows.map(res => {
      return {
        id: res.id,
        id_categorie: res.id_categorie,
        object: res.Objet,
        template: res.template
      }
    })
  }
}

function parsePrices (rows, params) {
  const newRows = rows.map(res => {
    const prix = {
      id: res.id,
      prix: res.prix,
      commentaire: res.commentaire,
      dateAction: res.DateAction,
      id_Objet: res.id_Objet,
      template: res.template
    }
    return prix
  })

  const result = {
    selectedYear: params[0],
    selectedMonth: params[1],
    prices: newRows
  }

  return result
}

module.exports = { parsePrices, parseCategories, parseObjects }
