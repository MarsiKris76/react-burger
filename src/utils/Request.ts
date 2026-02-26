import {refreshToken as refreshTokenApi} from "./UserApi";
import {getTokens, removeTokens, saveTokens} from "./Utils";
import {RequestOptions} from "../types/ApiTypes";
import {store} from "../services/RootReducer";
import {logoutUser} from "../services/slices/UserSlice";

const BASE_URL = 'https://norma.education-services.ru/api';

export const request = async <T>(endpoint: string, options?: RequestOptions): Promise<T> => {
    const url = `${BASE_URL}${endpoint}`;
    const config: RequestInit = {
        method: options?.method || 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        ...(options?.body && { body: options.body }),
    };
    let response = await fetch(url, config);
    const { refreshToken } = getTokens();
    if ((response.status === 401 || response.status === 403) && refreshToken) {
        try {
            const {accessToken, refreshToken} = await refreshTokenApi();
            saveTokens(accessToken, refreshToken);
            config.headers = {
                ...config.headers,
                authorization: `${accessToken}`,
            };
            response = await fetch(url, config);
        } catch (refreshError) {
            removeTokens();
            throw new Error('Требуется повторная авторизация');
        }
    }
    return checkResponse(response);
};

export const fetchWithoutAuth = async <T>(endpoint: string, options?: RequestOptions): Promise<T> => {
    const url = `${BASE_URL}${endpoint}`;
    const config: RequestInit = {
        method: options?.method || 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        ...(options?.body && { body: options.body }),
    };

    const response = await fetch(url, config);
    return checkResponse(response);
};

const checkResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        if (response.status === 401) {
            store.dispatch(logoutUser());
            window.location.replace('/login');
            throw new Error('Unauthorized');
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Ошибка ${response.status}`);
    }
    const data = await response.json();
    if (!data.success) {
        throw new Error(data.message || 'Неизвестная ошибка');
    }
    return data as T;
}
