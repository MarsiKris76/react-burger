import {request} from "./Request";
import {
    ForgotPasswordRequest,
    LoginRequest, RefreshTokenResponse,
    RegisterRequest,
    ResetPasswordRequest, UpdateUserRequest,
    UserResponse, UsualResponse
} from "../types/ApiTypes";

export const register = async (userDate: RegisterRequest): Promise<UserResponse> => {
    return request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userDate)
    });
};

export const login = async (authDate: LoginRequest): Promise<UserResponse> => {
    return request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(authDate)
    });
};

export const forgotPassword = async (emailDate: ForgotPasswordRequest): Promise<UsualResponse> => {
    return request('/password-reset', {
        method: 'POST',
        body: JSON.stringify(emailDate)
    });
};

export const resetPassword = async (resetPassDate: ResetPasswordRequest): Promise<UsualResponse> => {
    return request('/password-reset/reset', {
        method: 'POST',
        body: JSON.stringify(resetPassDate)
    });
};

export const logout = async (): Promise<UsualResponse> => {
    const refreshToken = localStorage.getItem('refreshToken');
    return request('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({ token: refreshToken }),
    });
};

export const updateUser = async (userData: UpdateUserRequest): Promise<UserResponse> => {
    const accessToken = localStorage.getItem('accessToken');
    return request('/auth/user', {
        method: 'PATCH',
        headers: {
            authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userData),
    });
};

export const getUser = async (): Promise<UserResponse> => {
    const accessToken = localStorage.getItem('accessToken');
    return request('/auth/user', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${accessToken}`,
        },
    });
};

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
    const refreshToken = localStorage.getItem('refreshToken');
    return request('/auth/token', {
        method: 'POST',
        body: JSON.stringify({ token: refreshToken }),
    });
};
