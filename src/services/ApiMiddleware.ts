import {Middleware} from '@reduxjs/toolkit';
import {RootState} from "../types/StoreTypes";

export const apiMiddleware: Middleware<{}, RootState> = (storeAPI) => (next) => (action) => {
    if (typeof action === 'function') {
        return action(storeAPI.dispatch, storeAPI.getState);
    }
    return next(action);
};