import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Ingredient} from "../../types/ComponentTypes";

const initialState: Ingredient | null = null;

export const viewIngredientSlice = createSlice({
    name: 'viewIngredient',
    initialState: initialState as Ingredient | null,
    reducers: {
        setCurrentIngredient: (state, action: PayloadAction<Ingredient>) => {
            return action.payload;
        },
        clearCurrentIngredient: (state) => {
            return null;
        },
    },
    selectors: {
        selectViewIngredientData: (state) => ({
            ingredient: state
        }),
    },
});

export const { setCurrentIngredient, clearCurrentIngredient } = viewIngredientSlice.actions;

export const {
  reducer: viewIngredientReducer,
  selectors: viewIngredientSelectors,
} = viewIngredientSlice;
