import {Ingredient} from "../types/ComponentTypes";


const BASE_URL = 'https://norma.education-services.ru/api';

export const getIngredientsApi = async (): Promise<Ingredient[]> => {
    const res = await fetch(`${BASE_URL}/ingredients`);
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Ошибка ${res.status}`);
    }
    const data = await res.json();
    if (!data.success) {
        throw new  Error(data.message || 'Неизвестная ошибка');
    }
    return data.data as Ingredient[];
};

export const sendOrderApi = async (ingredientsIds: string[]): Promise<any> => {
    const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: ingredientsIds }),
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Ошибка ${response.status}`);
    }
    const data = await response.json();
    if (!data.success) {
        throw new Error(data.message || 'Неизвестная ошибка');
    }
    return data;
};
