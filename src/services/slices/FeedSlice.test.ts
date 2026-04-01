import {feedReducer, wsConnect, wsConnected, wsDisconnected, wsMessageReceived, wsError} from './FeedSlice';
import type {FeedState} from '../../types/StoreTypes';
import {initialFeedState, mockWSMessage, mockOrders} from "../../tests/MockConstants";

describe('feedSlice extraReducers', () => {
    let initialState: FeedState;

    beforeEach(() => {
        initialState = initialFeedState;
    });

    it('should wsConnect set connecting state', () => {
        const state = feedReducer(initialState, wsConnect('ws://example.com'));
        expect(state.wsConnected).toBe(false);
        expect(state.wsConnecting).toBe(true);
        expect(state.error).toBeNull();
    });
    it('should wsConnected set connected state', () => {
        let state = feedReducer(initialState, wsConnect('ws://example.com'));
        state = feedReducer(state, wsConnected());
        expect(state.wsConnected).toBe(true);
        expect(state.wsConnecting).toBe(false);
        expect(state.error).toBeNull();
    });
    it('should wsDisconnected reset connection state and orders', () => {
        // Создаём состояние с подключённым WS и заказами
        const connectedState: FeedState = {
            ...initialState,
            wsConnected: true,
            orders: mockOrders
        };
        const state = feedReducer(connectedState, wsDisconnected());
        expect(state.wsConnected).toBe(false);
        expect(state.wsConnecting).toBe(false);
        expect(state.orders).toHaveLength(0);
        expect(state.total).toBe(0);
        expect(state.totalToday).toBe(0);
    });
    it('should wsMessageReceived update orders, total and totalToday', () => {
        const state = feedReducer(initialState, wsMessageReceived(mockWSMessage));
        expect(state.orders).toEqual(mockWSMessage.orders);
        expect(state.total).toBe(5);
        expect(state.totalToday).toBe(100);
    });
    it('should wsError reset connection state, clear orders and set error', () => {
        // Создаём состояние с подключённым WS
        const connectedState: FeedState = {
            ...initialState,
            wsConnected: true,
            wsConnecting: true
        };
        const state = feedReducer(connectedState, wsError());
        expect(state.wsConnected).toBe(false);
        expect(state.wsConnecting).toBe(false);
        expect(state.orders).toHaveLength(0);
        expect(state.error).toBe('WebSocket error');
    });
});
