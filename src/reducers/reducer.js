
export const mainReducer = (state = {}, action) => {
    switch (action.type) {
        case "INITIALISATION":
            console.log("action : ", action);
            const result = {
                ...state
                , selectedPrice : { priceObject : "defaut valeur",
                                    priceId: action.payload.selectedPriceId}
            }
            console.log("state : ", result);
            
            return result;

        case "SELECTED_PRICEID":
            return {
                ...state
                , selectedPrice : { ...state.selectedPrice , 
                                    priceId: action.payload}
            };



        // case "DELPERSONNE":
        //     return {
        //         ...state
        //         , personne: state.personne.filter((p) => p.id !== action.payload)
        //     };

        // case "ADDPERSONNE":
        //     return {
        //         ...state
        //         , isDisplayForm: false
        //         , personne: [...state.personne,
        //         {
        //             id: action.payload.id,
        //             personne: {
        //                 nom: action.payload.personne.nom
        //                 , prenom: action.payload.personne.prenom
        //             },
        //             adresse: {
        //                 num: action.payload.adresse.num
        //                 , voie: action.payload.adresse.voie
        //                 , cp: action.payload.adresse.cp
        //                 , ville: action.payload.adresse.ville

        //             },
        //             travail: {
        //                 societe: action.payload.travail.societe
        //                 , fonction: action.payload.travail.fonction
        //             }
        //         }
        //         ]
        //         , personneInput: personneVoid
        //     };

        // case "PERSONNEMAJFORM":
        //     return {
        //         ...state
        //         , isDisplayForm: true
        //         , personneInput: action.payload
        //     }

        // case "PERSONNEINPUTMAJ":
        //     return {
        //         ...state
        //         , personneInput: action.payload
        //     }

        // case "PERSONNEMAJ":
        //     return {
        //         ...state
        //         , isDisplayForm: false
        //         , personne: state.personne.map((p) => {
        //             if (p.id === state.personneInput.id)
        //                 return {
        //                     id: action.payload.id,
        //                     personne: {
        //                         nom: action.payload.personne.nom
        //                         , prenom: action.payload.personne.prenom
        //                     },
        //                     adresse: {
        //                         num: action.payload.adresse.num
        //                         , voie: action.payload.adresse.voie
        //                         , cp: action.payload.adresse.cp
        //                         , ville: action.payload.adresse.ville
        //                     },
        //                     travail: {
        //                         societe: action.payload.travail.societe
        //                         , fonction: action.payload.travail.fonction
        //                     }
        //                 }
        //             else
        //                 return p
        //         }
        //         )
        //         , personneInput: personneVoid
        //     }

        // case "TOGGLEISDISPLAYFORM":
        //     return {
        //         ...state
        //         , isDisplayForm: !state.isDisplayForm
        //     }

        default:
            return state;
    }
}
