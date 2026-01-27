import React from "react";

export type IngredientType = 'bun' | 'sauce' | 'main';

export type Ingredient = {
    _id: string;
    name: string;
    type: IngredientType;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    counter: number;
    image_mobile?: string;
    image_large?: string;
    __v?: number;
}

export type IngredientCardMiniProps = {
    ingredient: Ingredient;
    onClick: (ingredient: Ingredient) => void;
}

export type BurgerConstructorProps = {
    onOrderClick: () => void;
}

export type ModalProps = {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}

export type ModalOverlayProps = {
    onClick: () => void;
}

export type ConstructorItemProps = {
    ingredient: Ingredient & { uuid: string };
    index: number;
    onRemove: (uuid: string) => void;
}

export type DragItem = {
    ingredient: Ingredient;
    index: number;
    type: string;
}
