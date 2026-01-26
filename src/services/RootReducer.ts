import {combineReducers, configureStore} from '@reduxjs/toolkit';
import ingredientsReducer from './slices/IngredientsSlice';
import burgerConstructorReducer from './slices/BurgerConstructorSlice';
import viewIngredientReducer from './slices/ViewIngredientSlice';
import orderReducer from './slices/OrderSlice';

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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
