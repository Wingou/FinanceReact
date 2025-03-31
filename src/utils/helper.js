export const formatDate = d => {
  const date = new Date(d)
  return date.toLocaleDateString('fr-FR')
}

export const formatPrice = p => {
  return p !== 0 ? p.toFixed(2) + ' €' : ''
}

export const formatPriceWithZero = p => {
  return p.toFixed(2) + ' €'
}

export const convertDate = d => 
  {
    const date = new Date(d)
    return date.toLocaleDateString('fr-FR')

  }




export const getFirstObjId= (catId, objects) => {

  
  const  objId = catId===-1 ? 
            objects
                .filter(o=> o.template===0)[0].id
                :  objects
                  .filter(o=> o.catId===catId && o.template===0)
                  .sort((a,b)=> a.objName.localeCompare(b.objName))[0].id

  return objId
}