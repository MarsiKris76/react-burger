export type TIngredientType = 'bun' | 'sauce' | 'filling';

export type Ingredient = {
    _id: string;
    name: string;
    type: TIngredientType;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile?: string;
    image_large?: string;
    __v?: number;
}

export type IngredientCardMiniProps = {
    ingredient: Ingredient;
    count?: number;
    onClick?: (ingredient: Ingredient) => void;
}

export type IBurgerIngredientsProps = {
    ingredients?: Ingredient[];
}