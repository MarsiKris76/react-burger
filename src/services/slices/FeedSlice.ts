import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FeedState} from "../../types/StoreTypes";
import {WSMessage} from "../../types/ApiTypes";

export const wsConnect = createAction<string>('WS_CONNECT');
export const wsDisconnect = createAction('feed/WS_DISCONNECT');
export const wsSendMessage = createAction<WSMessage>('feed/WS_SEND_MESSAGE');
export const wsConnected = createAction('feed/WS_CONNECTED');
export const wsConnecting = createAction('feed/WS_CONNECTING');
export const wsDisconnected = createAction('feed/WS_DISCONNECTED');
export const wsMessageReceived = createAction<WSMessage>('feed/WS_MESSAGE_RECEIVED');
export const wsError = createAction('feed/WS_ERROR');

const initialState: FeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    wsConnected: false,
    wsConnecting: false,
    error: null,
};

export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(wsConnect, (state) => {
                state.wsConnected = false;
                state.wsConnecting = true;
                state.error = null;
            })
            .addCase(wsConnected, (state) => {
                state.wsConnected = true;
                state.wsConnecting = false;
                state.error = null;
            })
            .addCase(wsDisconnected, (state) => {
                state.wsConnected = false;
                state.wsConnecting = false;
                state.orders = [];
            })
            .addCase(wsMessageReceived, (state, action: PayloadAction<WSMessage>) => {
                const { orders, total, totalToday } = action.payload;
                state.orders = orders;
                state.total = total;
                state.totalToday = totalToday;
            })
            .addCase(wsError, (state) => {
                state.wsConnected = false;
                state.wsConnecting = false;
                state.orders = [];
                state.error = 'WebSocket error';
            });
    },
    selectors: {
        selectFeed: (state) => state,
        selectFeedOrders: (state) => state.orders,
        selectFeedTotal: (state) => state.total,
        selectFeedTotalToday: (state) => state.totalToday,
        selectWsConnected: (state) => state.wsConnected,
        selectWsConnecting: (state) => state.wsConnecting,
        selectWsError: (state) => state.error,
    }
});

export const {
    reducer: feedReducer,
    selectors: feedSelectors,
} = feedSlice;
