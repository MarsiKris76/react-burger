import {Ingredient} from "./ComponentTypes";

export type StoreState = {
    ingredients: {
        items: Ingredient[];
        loading: boolean;
        error: string | null;
    };
    burgerConstructor: {
        bun: Ingredient | null;
        ingredients: (Ingredient & { uuid: string })[];
    };
    viewIngredient: Ingredient | null;
    order: {
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
    };
}

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
