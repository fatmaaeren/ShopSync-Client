import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isGoShopping: false,
}

const shopping = createSlice({
    name: 'shopping',
    initialState,
    reducers: {
        setTrue: (state) => {
            state.isGoShopping = true
        },
        setFalse: (state) => {
            state.isGoShopping = false
        },

    },
})

export const { setTrue, setFalse } = shopping.actions;
export default shopping.reducer;