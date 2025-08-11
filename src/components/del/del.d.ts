import { Categorie, ModifPriceInput, Price } from "../../types/common"

export interface DelLineProps {
    selectedCats: Categorie[],
    price: Price,
    modifPriceInput: ModifPriceInput,
    view: ViewOptions,
}
