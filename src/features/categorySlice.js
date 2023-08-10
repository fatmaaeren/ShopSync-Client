import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
}

const categories = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload
        },
        addNewCategory: (state, action) => {
            state.categories = [
                ...state.categories,
                action.payload
            ]
        },
        deleteCategory: (state, action) => {
            state.categories = state.categories.filter(category => category.id !== action.payload)
        }
        
    },  
})

export const { setCategories, addNewCategory, deleteCategory} = categories.actions;
export default categories.reducer;