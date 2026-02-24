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
