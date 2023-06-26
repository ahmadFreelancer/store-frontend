import { createContext, useContext, useEffect, useReducer } from "react";
import ProductReducer from "../reducers/ProductsReducer";
import axios from "axios";

const ProductContext = createContext();


const ProContextProvider = ({ children }) => {
    const initialState = {
        products: [],
        singleProduct: [],
        query: 'sort=name',
        page: 1,
        limit: 6,
        totalResults: 0,
        nbHits: 0,
        nextBtnDisable: false,
        cart: [],
        cartEmpty: true,
        quantity: 1,
        SearchVal: "",
    }

    const [state, dispatch] = useReducer(ProductReducer, initialState);

    const fetchProductsData = async () => {
        const response = await axios.get(`https://storebackend-ldjb.onrender.com/api/v1/products?${state.query}&page=${state.page}&limit=${state.limit}`);
        let receivedData = response.data.products;
        let nbHits = response.data.nbHits;
        // console.log(receivedData)
        dispatch({ type: "POPULATE_STATE", payload: {receivedData, nbHits} })
        dispatch({ type: "NEXT_BTN_DISABLE"})
    }

    const populateSingle = (response) => {
        dispatch({ type: "POPULATE_SINGLE", payload: response })
    }



    const fetchTotalResults = async () => {
        const response = await axios.get(`https://storebackend-ldjb.onrender.com/api/v1/products?limit=1999`);
        let receivedData = response.data.nbHits;
        dispatch({ type: "TOTAL_RESULTS", payload: receivedData })
    }
    // Above dispatch "TOTAL_RESULTS", set total results to the number of articles remaining to show on next page.


    // if(state.nbHits){
    //     console.log(`state.nbHits ${state.nbHits}`)
    // console.log(`state.totalResults ${state.totalResults}`)
    // }

    const categoryQuery = (queryParams) => {
        queryParams = queryParams.toLowerCase();
        dispatch({ type: "SET_CATEGORY_QUERY", payload: queryParams })
    }
    const companyQuery = (queryParams) => {
        queryParams = queryParams.toLowerCase();
        dispatch({ type: "SET_COMPANY_QUERY", payload: queryParams })
    }
    const sortQuery = (queryParams) => {
        dispatch({ type: "SET_SORT_QUERY", payload: queryParams })
    }
    const resetQuery = () => {
        dispatch({ type: "RESET_QUERY" })
    }
    const nextPageFunc = () => {
        dispatch({ type: "NEXT_PAGE" })
    }
    const prevPageFunc = () => {
        dispatch({ type: "PREV_PAGE" })
    }

    const addItemsToCart = (data) => {
        dispatch({type: "ADD_ITEMS_TO_CART", payload: data})
    }

    const incrementQty = () => {
        dispatch({type: "INCREMENT_QTY"})
    }
    const decrementQty = () => {
        dispatch({type: "DECREMENT_QTY"})
    }

    const clearCart = () => {
        dispatch({type: "CLEAR_CART"})
    }
    const heroSearch = (val) => {
        dispatch({type: "HERO_SEARCH", payload: val})
    }
    const SearchClear = () => {
        dispatch({type: "SEARCH_CLEAR"})
    }
    

    

    useEffect(() => {
        fetchProductsData()
    }, [state.query, state.page])

    useEffect(() => {
        fetchTotalResults()
    }, [])


    return (
        <ProductContext.Provider value={{ ...state, fetchProductsData, categoryQuery, companyQuery, sortQuery, resetQuery, prevPageFunc, nextPageFunc, populateSingle, addItemsToCart, incrementQty, decrementQty, clearCart, heroSearch, SearchClear }}>
            {children}
        </ProductContext.Provider>
    )
}

const UseProductContext = () => {
    return useContext(ProductContext)
}

export { UseProductContext, ProContextProvider }
