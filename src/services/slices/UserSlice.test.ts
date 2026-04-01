import {userReducer, authCheck, clearAuthError, registerUser, loginUser} from './UserSlice';
import { UserState } from '../../types/StoreTypes';

// Это нужно, что бы избежать ошибки 'No reducer provided for key "user"'
jest.mock('../../utils/UserApi', () => ({
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
    updateUser: jest.fn(),
    getUser: jest.fn(),
    refreshToken: jest.fn(),
    forgotPassword: jest.fn(),
    resetPassword: jest.fn(),
}));

describe('userSlice reducers', () => {
    let initialState: UserState;

    beforeEach(() => {
        initialState = {
            user: null,
            isAuthChecked: false,
            authError: null,
            isUpdating: false,
            isPasswordRecoveryRequested: false,
            isRegistering: false,
        };
    });

    describe('authCheck', () => {
        it('should set isAuthChecked to true', () => {
            const result = userReducer(initialState, authCheck());
            expect(result.isAuthChecked).toBe(true);
        });
    });

    describe('clearAuthError', () => {
        it('should clear authError', () => {
            const stateWithError = { ...initialState, authError: 'Some error' };
            const result = userReducer(stateWithError, clearAuthError());
            expect(result.authError).toBeNull();
        });
    });
});

describe('userSlice extraReducers', () => {
    let initialState: UserState;

    beforeEach(() => {
        initialState = {
            user: null,
            isAuthChecked: false,
            authError: null,
            isUpdating: false,
            isPasswordRecoveryRequested: false,
            isRegistering: false,
        };
    });

    describe('loginUser', () => {
        it('should handle pending', () => {
            const action = { type: loginUser.pending.type };
            const result = userReducer(initialState, action);
            expect(result.authError).toBeNull();
        });
        it('should handle fulfilled', () => {
            const mockUser = { name: 'Test User', email: 'test@example.com' };
            const action = {
                type: loginUser.fulfilled.type,
                payload: mockUser,
            };
            const result = userReducer(initialState, action);
            expect(result.user).toEqual(mockUser);
            expect(result.isAuthChecked).toBe(true);
            expect(result.authError).toBeNull();
        });
        it('should handle rejected', () => {
            const errorMessage = 'Ошибка входа';
            const action = {
                type: loginUser.rejected.type,
                payload: errorMessage,
            };
            const result = userReducer(initialState, action);
            expect(result.authError).toBe(errorMessage);
            expect(result.user).toBeNull();
            expect(result.isAuthChecked).toBe(true);
        });
    });

    describe('registerUser', () => {
        it('should handle pending', () => {
            const action = { type: registerUser.pending.type };
            const result = userReducer(initialState, action);
            expect(result.isRegistering).toBe(true);
            expect(result.authError).toBeNull();
        });
        it('should handle fulfilled', () => {
            const mockUser = { name: 'New User', email: 'new@example.com' };
            const action = {
                type: registerUser.fulfilled.type,
                payload: mockUser,
            };
            const result = userReducer(initialState, action);
            expect(result.user).toEqual(mockUser);
            expect(result.isAuthChecked).toBe(true);
            expect(result.isRegistering).toBe(false);
            expect(result.authError).toBeNull();
        });
        it('should handle rejected', () => {
            const errorMessage = 'Ошибка регистрации';
            const action = {
                type: registerUser.rejected.type,
                payload: errorMessage,
            };
            const result = userReducer(initialState, action);
            expect(result.isRegistering).toBe(false);
            expect(result.authError).toBe(errorMessage);
        });
    });
});
