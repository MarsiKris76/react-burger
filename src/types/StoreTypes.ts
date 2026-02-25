import {Ingredient} from "./ComponentTypes";
import {store} from "../services/RootReducer";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type IngredientsState = {
    items: Ingredient[];
    loading: boolean;
    error: string | null;
}

export type BurgerConstructorState = {
    bun: Ingredient | null;
    ingredients: ConstructorIngredient[];
}

export type ConstructorIngredient = Ingredient & { uuid: string };

export type OrderState = {
    orderRequest: boolean;
    orderSuccess: boolean;
    order: {
        name: string;
        order: {
            number: number;
        };
        success: boolean;
    } | null;
    error: string | null;
}

export type User = {
    name: string;
    email: string;
}

export type UserState = {
    user: User | null;
    isAuthChecked: boolean;
    authError: string | null;
    isUpdating: boolean;
    isPasswordRecoveryRequested: boolean;
    isRegistering: boolean;
};
