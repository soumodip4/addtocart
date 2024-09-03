import { configureStore } from "@reduxjs/toolkit";
import ProdSlice from "./ProdSlice";


export const store = configureStore({
    reducer:{
        prod:ProdSlice
    }
})