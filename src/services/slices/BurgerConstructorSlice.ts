import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {BurgerConstructorState} from "../../types/StoreTypes";
import {Ingredient} from "../../types/ComponentTypes";

const initialState: BurgerConstructorState = {
    bun: null,
    ingredients: [],
};

export const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        addIngredient: (state, action: PayloadAction<Ingredient>) => {
            const ingredient = action.payload;
            if (ingredient.type === 'bun') {
                state.bun = ingredient;
            } else {
                state.ingredients.push({
                    ...ingredient,
                    uuid: generateUUID()
                });
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
});

const generateUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export const {
    addIngredient,
    removeIngredient,
    moveIngredient,
    replaceBun,
    resetConstructor,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
