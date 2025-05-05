import { Categorie, ModifPriceInput, Price } from "../../types/common"

export interface DelLineProps {
    filteredCats: Categorie[],
    price: Price,
    modifPriceInput: ModifPriceInput
}
