const ProductReducer = (state, action) => {

    if (action.type === "POPULATE_STATE") {
        return {
            ...state,
            products: action.payload.receivedData,
            nbHits: action.payload.nbHits
        }
    }
    if (action.type === "POPULATE_SINGLE") {
        return {
            ...state,
            singleProduct: action.payload
        }
    }
    if (action.type === "NEXT_BTN_DISABLE") {
        if(state.nbHits < state.limit) {
            return {
                ...state,
                nextBtnDisable: true
            }
        }
        else{
            return {
                ...state,
                nextBtnDisable: false
            }
        }
    }
    if (action.type === "ADD_ITEMS_TO_CART") {


        // let updated = state.cart.reduce((accum, elem) =>{
        //     console.log(accum)
        //     console.log(elem)
        // })

        let updatedItem = { ...action.payload, newQuantity: state.quantity }
        return {
            ...state,
            cart: [...state.cart, updatedItem],
            cartEmpty: false
        }





    }

    if (action.type === "SET_CATEGORY_QUERY") {
        return {
            ...state,
            query: `category=${action.payload}`
        }
    }
    if (action.type === "SET_COMPANY_QUERY") {
        return {
            ...state,
            query: `company=${action.payload}`
        }
    }
    if (action.type === "SET_SORT_QUERY") {
        return {
            ...state,
            query: action.payload
        }
    }
    if (action.type === "RESET_QUERY") {
        return {
            ...state,
            query: ""
        }
    }
    if (action.type === "TOTAL_RESULTS") {
        return {
            ...state,
            totalResults: action.payload - state.limit
        }
    }
    if (action.type === "NEXT_PAGE") {
        if (state.totalResults <= state.limit) {
            return {
                ...state,
                nextBtnDisable: true,
                page: state.page + 1,
                totalResults: state.totalResults - state.limit
            }
        }
        return {
            ...state,
            page: state.page + 1,
            totalResults: state.totalResults - state.limit
        }
    }
    if (action.type === "PREV_PAGE") {
        if (state.totalResults <= 0) {
            return {
                ...state,
                page: state.page - 1,
                nextBtnDisable: false,
                totalResults: state.totalResults + state.limit
            }
        }
        return {
            ...state,
            page: state.page - 1,
            totalResults: state.totalResults + state.limit
        }
    }
    if (action.type === "INCREMENT_QTY") {
        return {
            ...state,
            quantity: state.quantity + 1
        }
    }
    if (action.type === "DECREMENT_QTY") {
        return {
            ...state,
            quantity: state.quantity <= 1 ? state.quantity : state.quantity - 1
        }
    }

    if (action.type === "CLEAR_CART") {
        return {
            ...state,
            cart: [],
            cartEmpty: true
        }
    }


    // if (action.type === "HERO_SEARCH") {
    //     let updatedSearch = state.products.filter((data) => {
    //         if (data.name.includes(action.payload)) {
    //             console.log("Yes it contains")
    //             return {
    //                 ...state,
    //                 products: data
    //             }
    //         }
    //         console.log("if Mid")
    //     })
    //     console.log("mid")
    //     return {
    //         ...state,
    //         SearchVal: action.payload,
    //         products: updatedSearch,
    //     }
    // }


    
    
    return state;
}


export default ProductReducer;