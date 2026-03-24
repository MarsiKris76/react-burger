import {Ingredient} from "../types/ComponentTypes";
import {request} from "./Request";
import {getTokens} from "./Utils";

export const getIngredientsApi = async (): Promise<Ingredient[]> => {
    const response = await request<{ data: Ingredient[]; success: boolean }>('/ingredients');
    return response.data;
};

export const sendOrderApi = async (ingredientsIds: string[]): Promise<any> => {
    const { accessToken } = getTokens();
    return request('/orders', {
        method: 'POST',
        headers: {
            authorization: `${accessToken ? accessToken : ''}`,
        },
        body: JSON.stringify({ ingredients: ingredientsIds }),
    });
};
