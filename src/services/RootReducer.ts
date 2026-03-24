import {combineReducers, configureStore, Middleware} from '@reduxjs/toolkit';
import {ingredientsReducer} from './slices/IngredientsSlice';
import {burgerConstructorReducer} from './slices/BurgerConstructorSlice';
import {viewIngredientReducer} from './slices/ViewIngredientSlice';
import {orderReducer} from './slices/OrderSlice';
import {userReducer} from './slices/UserSlice';
import {AppDispatch, RootState} from "../types/StoreTypes";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {
    feedReducer,
    wsConnect,
    wsConnected,
    wsDisconnect,
    wsDisconnected, wsError,
    wsMessageReceived,
    wsSendMessage
} from "./slices/FeedSlice";
import {createWebSocketMiddleware} from "../utils/WSMiddleware";
import {WSMessage} from "../types/ApiTypes";

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    viewIngredient: viewIngredientReducer,
    order: orderReducer,
    user: userReducer,
    feed: feedReducer,
});

const webSocketMiddleware: Middleware = createWebSocketMiddleware<WSMessage>(
    {
        connect: wsConnect,
        disconnect: wsDisconnect,
        sendMessage: wsSendMessage,
        onConnected: wsConnected,
        onDisconnected: wsDisconnected,
        onMessageReceived: wsMessageReceived,
        onError: wsError,
    },
    {
        withTokenRefresh: true,
    }
);

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }).concat(webSocketMiddleware),
});

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
