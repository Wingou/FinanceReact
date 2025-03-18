function parseCategories (rows, _) {
  return {
    cat: rows.map(resCat => {
      return {
        id: resCat.id,
        catName: resCat.Categorie,
        template: resCat.template
      }
    })
  }
}

function parseObjects (rows, _) {
  return {
    obj: rows.map(resObj => {
      return {
        id: resObj.id,
        catId: resObj.id_categorie,
        objName: resObj.Objet,
        template: resObj.template
      }
    })
  }
}

function parsePrices (rows, params) {
  const newRows = rows.map(res => {
    const price = {
      id: res.id,
      priceValue: res.prix,
      comment: res.commentaire,
      actionDate: res.DateAction,
      objectId: res.id_Objet,
      template: res.template
    }
    return price
  })

  const result = {
    selectedYear: params[0],
    selectedMonth: params[1],
    prices: newRows
  }

  return result
}

module.exports = { parsePrices, parseCategories, parseObjects }
