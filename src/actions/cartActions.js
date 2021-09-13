import { ADD_TO_CART, SUB_QUANTITY, ADD_QUANTITY, ADD_ITEMS, SET_SORTING_ID, SET_PRODUCT_TYPE, SET_BRANDS, SET_TAGS} from './actionTypes';

//add cart action
export const addToCart= (id)=>{
    return{
        type: ADD_TO_CART,
        id
    }
}
//subtract qt action
export const subtractQuantity=(id)=>{
    return{
        type: SUB_QUANTITY,
        id
    }
}
//add qt action
export const addQuantity=(id)=>{
    return{
        type: ADD_QUANTITY,
        id
    }
}
//add items action
export const addItems=(data)=>{
    return{
        type: ADD_ITEMS,
        data
    }
}
//add sorting action
export const setSortingId=(id)=>{
    return{
        type: SET_SORTING_ID,
        id
    }
}
//add product type action
export const setProductType=(product)=>{
    return{
        type: SET_PRODUCT_TYPE,
        product
    }
}

export const setBrands = (brands) => {
    return {
        type: SET_BRANDS,
        brands
    }
}

export const setTags = (tags) => {
    return {
        type: SET_TAGS,
        tags
    }
}
