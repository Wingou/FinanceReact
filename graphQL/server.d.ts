export interface CatRaw {
  id: number,
  Categorie: string,
  Ordre: number,
  template: number
}

export interface Cat {
  id: number,
  name: string,
  position: number,
  template: number
}

export interface ObjRaw {
    id: number,
    Objet: string,
    id_categorie : number
    template: number
}

export interface Obj {
    id: number,
    name: string,
    template: number
    cat: {
        id : number
    }
  }
