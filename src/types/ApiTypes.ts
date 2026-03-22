import {User} from "./StoreTypes";

export type RequestOptions = {
    method?: string;
    headers?: HeadersInit;
    body?: string;
}

export type UserResponse = {
    success: boolean;
    user: User;
    accessToken: string;
    refreshToken: string;
}

export type UsualResponse = {
    success: boolean;
    message: string;
}

export type RefreshTokenResponse = {
    success: boolean;
    accessToken: string;
    refreshToken: string;
}

export type LoginRequest = {
    email: string;
    password: string;
}

export type RegisterRequest = {
    email: string;
    password: string;
    name: string;
}

export type UpdateUserRequest = {
    email?: string;
    password?: string;
    name?: string;
}

export type ResetPasswordRequest = {
    password: string;
    token: string;
}

export type ForgotPasswordRequest = {
    email: string;
}

export type Order = {
    _id: string;
    ingredients: string[];
    status: 'created' | 'pending' | 'done';
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
};

export type WSMessage = {
    success: boolean;
    orders: Order[];
    total: number;
    totalToday: number;
};

export type WebSocketOptions = {
    withTokenRefresh: boolean;
};
