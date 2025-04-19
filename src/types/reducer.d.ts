export interface PriceRaw {
  id: number,
  amount: number,
  comment: string,
  actionDate: string,
  dateCreate: string,
  dateModif: string,
  template: number
}

export interface ObjRaw {
  id: number,
  name: string,
  template: number
}

export interface CatRaw {
  id: number,
  name: string,
  position: number|null,
  template: number
}

export interface PricesAPI extends PriceRaw {
  obj: ObjRaw,
  cat: CatRaw
}

export interface ObjectsAPI extends ObjRaw {
  cat: {
    id: number
  }
}

export interface CategoriesAPI extends CatRaw { }