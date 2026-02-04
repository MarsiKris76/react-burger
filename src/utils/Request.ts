type RequestOptions = {
    method?: string;
    headers?: HeadersInit;
    body?: string;
}

export const request = async <T>(endpoint: string, options?: RequestOptions): Promise<T> => {
    const BASE_URL = 'https://norma.education-services.ru/api';
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
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Ошибка ${response.status}`);
    }
    const data = await response.json();
    if (!data.success) {
        throw new Error(data.message || 'Неизвестная ошибка');
    }

    return data as T;
};