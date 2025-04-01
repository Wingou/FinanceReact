import { store } from '../store'
import { formatPriceSQL, formatTextSQL } from '../utils/helper'

export const handleCatIdInput = e => {
  const catId = e.target.value
  const action = {
    type: 'ADDPRICEINPUT_SET_CATID',
    payload: catId
  }
  store.dispatch(action)
}



export const handleObjIdInput = e => {
  const objId = e.target.value
  const action = {
    type: 'ADDPRICEINPUT_SET_OBJID',
    payload: objId
  }
  store.dispatch(action)
}


export const handleDateInput = e => {
  const actionDate = e.target.value.split("T")[0]
  const action = {
    type : 'ADDPRICEINPUT_SET_DATE',
    payload : actionDate
  }
  store.dispatch(action)
}

export const handlePriceInput = e => {
  const action = {
    type : 'ADDPRICEINPUT_SET_PRICE',
    payload : e.target.value
  }
  store.dispatch(action)
}

export const handleCommentInput = e => {
  const action = {
    type : 'ADDPRICEINPUT_SET_COMMENT',
    payload : e.target.value
  }
  store.dispatch(action)
}


export const handleAddPrice = async (addPriceInput)=> {

  const dataInput = {
    price: formatPriceSQL(addPriceInput.priceValue),
    objId: addPriceInput.objId,
    actionDate: addPriceInput.actionDate,
    comment: formatTextSQL(addPriceInput.comment)
  }
  
    try {
      const api  = `http://localhost:3001/addPrice`
      const resp = await fetch(api, { method: "POST", body: JSON.stringify(dataInput) })
      const rs = await resp.json()
      console.log("rs :", rs)
      store.dispatch({
        type: 'SET_PRICES_AFTER_ADD',
        payload:   {...addPriceInput,
                id :  rs
        }
      })
    } catch (error) {
      console.error('error addPrice :', error)
    }
  


}

// export const handleMajPersonne = async (id, personneInput) => {
//   let actionType = "PERSONNEMAJ";
//   let apiUrl = "http://localhost:3001/update";
//   if (id === 0) {
//       actionType = "ADDPERSONNE";
//       apiUrl = "http://localhost:3001/add";
//   }
//   const dataInput = {
//       id: personneInput.id,
//       nom: personneInput.personne.nom,
//       prenom: personneInput.personne.prenom,
//       num: personneInput.adresse.num,
//       voie: personneInput.adresse.voie,
//       cp: personneInput.adresse.cp,
//       ville: personneInput.adresse.ville,
//       societe: personneInput.travail.societe,
//       fonction: personneInput.travail.fonction
//   }
//   await fetch(apiUrl, { method: "POST", body: JSON.stringify(dataInput) })
//       .then(data => data.json())
//       .then(res => {
//           const payload = {
//               id: res[0].id,
//               personne: {
//                   nom: res[0].personne.nom,
//                   prenom: res[0].personne.prenom,
//               },
//               adresse: {
//                   num: res[0].adresse.num,
//                   voie: res[0].adresse.voie,
//                   cp: res[0].adresse.cp,
//                   ville: res[0].adresse.ville
//               },
//               travail: {
//                   societe: res[0].travail.societe,
//                   fonction: res[0].travail.fonction
//               }
//           }
//           store.dispatch({
//               type: actionType,
//               payload
//           })
//       })
//       .catch(error => console.error(error));
// }