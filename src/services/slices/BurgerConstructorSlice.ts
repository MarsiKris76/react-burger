import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {BurgerConstructorState, ConstructorIngredient} from "../../types/StoreTypes";
import {Ingredient} from "../../types/ComponentTypes";
import { v4 as uuid } from 'uuid';

const initialState: BurgerConstructorState = {
    bun: null,
    ingredients: [],
};

export const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        addIngredient: {
            reducer: (state, action: PayloadAction<ConstructorIngredient>) => {
                const ingredient = action.payload;
                if (ingredient.type === 'bun') {
                    state.bun = ingredient;
                } else {
                    state.ingredients.push(ingredient);
                }
            },
            prepare: (ingredient: Ingredient) => {
                return { payload: { ...ingredient, uuid: uuid() } };
            }
        },
        removeIngredient: (state, action: PayloadAction<string>) => {
            state.ingredients = state.ingredients.filter(
                (item) => item.uuid !== action.payload
            );
        },
        moveIngredient: (state, action: PayloadAction<{ from: number; to: number }>) => {
            const { from, to } = action.payload;
            const movedItem = state.ingredients[from];
            state.ingredients.splice(from, 1);
            state.ingredients.splice(to, 0, movedItem);
        },
        replaceBun: (state, action: PayloadAction<Ingredient>) => {
            state.bun = action.payload;
        },
        resetConstructor: (state) => {
            state.bun = null;
            state.ingredients = [];
        },
    },
    selectors: {
        selectBurgerConstructorData: (state) => ({
            bun: state.bun,
            ingredients: state.ingredients
        })
    },
});

export const {
    addIngredient,
    removeIngredient,
    moveIngredient,
    replaceBun,
    resetConstructor,
} = burgerConstructorSlice.actions;

export const {
  reducer: burgerConstructorReducer,
  selectors: burgerConstructorSelectors,
} = burgerConstructorSlice;
