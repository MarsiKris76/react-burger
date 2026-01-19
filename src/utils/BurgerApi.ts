import {Ingredient} from "../types/Types";


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