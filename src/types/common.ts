import { VIEW } from "../constants/constants";

export interface AddPriceInput {
    catId : number,
    objId : number,
  priceValue: number,
  actionDate : string,
  comment: string
}

export interface Price {
    id: number,
    priceValue: number;
    actionDate: string,
    comment: string,
    objId: number,
    objName: string,
    template: number,
    dateCreate: string,
    dateModif: string
    catId : number,
    catName: string
}

export interface Object     {
      id:Number,
catId: Number,
objName: string,
template: Number

}


export interface Categorie {
    id: number,
        catName: string,
        position: number,
        template: number,
        filtered:boolean,
        recette : number,
        depense : number
        

}


export interface Year  {
    year : string,
    filtered:boolean
  }
  
  export interface Month  {
    month : string,
    name : string,
    filtered:boolean
  }


  export interface SearchOptions {
    isMultiYears: boolean,
    isMultiMonths: boolean,
    isMultiCats: boolean,
    searchWord: string,
    searchMin: number,
    searchMax: number,
    top: number
  }

export interface State  {
  prices: Price[],
  objects: Object[],
  categories: Categorie [],
  years: Year  [],
  months: Month[],
  searchOptions: SearchOptions,
  view: VIEW,
  addPriceInput: AddPriceInput
}
