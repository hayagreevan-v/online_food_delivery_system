import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import productReducer from './menu/productsSlice';
const rootReducer = combineReducers(
    {
        cart: cartReducer,
        products: productReducer
    }
);

export default rootReducer;