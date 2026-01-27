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
    ingredients: (Ingredient & { uuid: string })[];
}

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
