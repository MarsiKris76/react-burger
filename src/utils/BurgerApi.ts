import {Ingredient} from "../types/ComponentTypes";
import {request} from "./Request";

export const getIngredientsApi = async (): Promise<Ingredient[]> => {
    const response = await request<{ data: Ingredient[]; success: boolean }>('/ingredients');
    return response.data;
};

export const sendOrderApi = async (ingredientsIds: string[]): Promise<any> => {
    return request('/orders', {
        method: 'POST',
        body: JSON.stringify({ ingredients: ingredientsIds }),
    });
};
