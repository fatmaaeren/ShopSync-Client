import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shoppingLists: [],
}

const shoppingList = createSlice({
    name: 'shoppingList',
    initialState,
    reducers: {
        setShoppingList: (state, action) => {
            state.shoppingLists = action.payload
        },
    },
})

export const { setShoppingList } = shoppingList.actions;
export default shoppingList.reducer;