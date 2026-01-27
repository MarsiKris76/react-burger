import {combineReducers, configureStore} from '@reduxjs/toolkit';
import ingredientsReducer from './slices/IngredientsSlice';
import burgerConstructorReducer from './slices/BurgerConstructorSlice';
import viewIngredientReducer from './slices/ViewIngredientSlice';
import orderReducer from './slices/OrderSlice';
import {RootState} from "../types/StoreTypes";

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    viewIngredient: viewIngredientReducer,
    order: orderReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
});


export const selectIngredients = (state: RootState) => state.ingredients;
export const selectBurgerConstructor = (state: RootState) => state.burgerConstructor;
export const selectViewIngredient = (state: RootState) => state.viewIngredient;
export const selectOrder = (state: RootState) => state.order;

