export interface CatRaw {
  id: number,
  Categorie: string,
  Ordre: number,
  template: number
}




export interface ObjRaw {
    id: number,
    Objet: string,
    id_categorie : number
    template: number
}



export interface YearRaw {
    year : string
}



export interface WhereObjets {
  where: {
      id: string,
      catId: string
  }
}


  

  