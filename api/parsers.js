function parseCategories (rows, _) {
  return {
    cat: rows.map(resCat => {
      return {
        catId: resCat.id,
        cat: resCat.Categorie,
        catTemplate: resCat.template
      }
    })
  }
}

function parseObjects (rows, _) {
  return {
    obj : rows.map(resObj => {
      return {
        objId: resObj.id,
        objcatId: resObj.id_categorie,
        obj: resObj.Objet,
        objTemplate: resObj.template
      }
    })
  }
}

function parsePrices (rows, params) {
  const newRows = rows.map(res => {
    const price = {
      priceId: res.id,
      price: res.prix,
      comment : res.commentaire,
      actionDate: res.DateAction,
      objectId: res.id_Objet,
      priceTemplate: res.template
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
