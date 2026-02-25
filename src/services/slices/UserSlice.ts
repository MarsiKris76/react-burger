import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {
    login as loginApi,
    register as registerApi,
    logout as logoutApi,
    updateUser as updateUserApi,
    getUser as getUserApi,
    refreshToken as refreshTokenApi,
    forgotPassword as forgotPasswordApi,
    resetPassword as resetPasswordApi
} from '../../utils/UserApi';
import {User, UserState} from '../../types/StoreTypes';
import {
    ForgotPasswordRequest,
    LoginRequest,
    RegisterRequest,
    ResetPasswordRequest,
    UpdateUserRequest
} from "../../types/ApiTypes";
import {removeTokens, saveTokens} from "../../utils/Utils";

export const loginUser = createAsyncThunk(
    'user/login',
    async ({email, password}: LoginRequest, { rejectWithValue }) => {
        try {
            const response = await loginApi({ email, password });
            saveTokens(response.accessToken, response.refreshToken);
            return response.user;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Ошибка входа');
        }
    }
);

export const registerUser = createAsyncThunk(
    'user/register',
    async ({ name, email, password }: RegisterRequest, { rejectWithValue }) => {
        try {
            const response = await registerApi({ name, email, password });
            saveTokens(response.accessToken, response.refreshToken);
            return response.user;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Ошибка регистрации');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'user/logout',
    async (_, { rejectWithValue }) => {
        try {
            await logoutApi();
            removeTokens();
            return {};
        } catch (error: any) {
            return rejectWithValue(error.message || 'Ошибка выхода');
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/update',
    async ({ name, email, password }: UpdateUserRequest, { rejectWithValue }) => {
        try {
            const response = await updateUserApi({ name, email, password });
            return response.user;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Ошибка обновления профиля');
        }
    }
);

export const fetchUser = createAsyncThunk(
    'user/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getUserApi();
            return response.user;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Ошибка получения данных пользователя');
        }
    }
);

export const forgotPassword = createAsyncThunk(
    'user/forgotPassword',
    async ({ email }: ForgotPasswordRequest, { rejectWithValue }) => {
        try {
            return await forgotPasswordApi({ email });
        } catch (error: any) {
            return rejectWithValue(error.message || 'Ошибка восстановления пароля');
        }
    }
);

export const resetPassword = createAsyncThunk(
    'user/resetPassword',
    async ({ password, token }: ResetPasswordRequest, { rejectWithValue }) => {
        try {
            return await resetPasswordApi({ password, token });
        } catch (error: any) {
            return rejectWithValue(error.message || 'Ошибка сброса пароля');
        }
    }
);

export const updateToken = createAsyncThunk(
    'user/updateToken',
    async (_, { rejectWithValue }) => {
        try {
            const response = await refreshTokenApi();
            saveTokens(response.accessToken, response.refreshToken);
            return {};
        } catch (error: any) {
            return rejectWithValue(error.message || 'Ошибка обновления токена');
        }
    }
);

const initialState: UserState = {
    user: null,
    isAuthChecked: false,
    authError: null,
    isUpdating: false,
    isPasswordRecoveryRequested: false,
    isRegistering: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthChecked = true;
            state.authError = null;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthChecked = true;
            state.authError = null;
        },
        authCheck: (state) => {
            state.isAuthChecked = true;
        },
        clearAuthError: (state) => {
            state.authError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.authError = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
                state.authError = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.authError = action.payload as string;
                state.user = null;
                state.isAuthChecked = true;
            })
            .addCase(registerUser.pending, (state) => {
                state.isRegistering = true;
                state.authError = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
                state.isRegistering = false;
                state.authError = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isRegistering = false;
                state.authError = action.payload as string;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthChecked = true;
                state.authError = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.authError = action.payload as string;
            })
            .addCase(updateUser.pending, (state) => {
                state.isUpdating = true;
                state.authError = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isUpdating = false;
                state.authError = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isUpdating = false;
                state.authError = action.payload as string;
            })
            .addCase(fetchUser.pending, (state) => {
                state.isAuthChecked = false;
                state.authError = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
                state.authError = null;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.authError = action.payload as string;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.isPasswordRecoveryRequested = true;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.authError = action.payload as string;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.authError = action.payload as string;
            })
            .addCase(updateToken.fulfilled, (state) => {
                state.authError = null;
            })
            .addCase(updateToken.rejected, (state, action) => {
                state.authError = action.payload as string;
                state.user = null;
                removeTokens();
            });
    },
});

export const { setUser, logout, authCheck, clearAuthError } = userSlice.actions;

export default userSlice.reducer;
