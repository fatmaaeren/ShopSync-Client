import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
}

const product = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
        },
    },

})

export const { setProducts } = product.actions;
export default product.reducer;