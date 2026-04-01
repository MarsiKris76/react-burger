import {orderReducer, sendOrder, resetOrder} from './OrderSlice';
import {mockBun, mockMain, mockOrderResponse, mockSauce} from "../../tests/MockConstants";
import type {OrderState} from '../../types/StoreTypes';
import * as BurgerApi from '../../utils/BurgerApi';
import {configureStore} from "@reduxjs/toolkit";

jest.mock('../../utils/BurgerApi');
const mockIngredient1 = mockMain;
const mockIngredient2 = mockSauce;

describe('resetOrder', () => {
    it('should reset all order state fields to initial values', () => {
        const modifiedState: OrderState = {
            orderRequest: true,
            orderSuccess: true,
            order: mockOrderResponse.order,
            error: 'Some error'
        };
        const state = orderReducer(modifiedState, resetOrder());
        expect(state.orderRequest).toBe(false);
        expect(state.orderSuccess).toBe(false);
        expect(state.order).toBeNull();
        expect(state.error).toBeNull();
    });
});

describe('orderSlice extraReducers (sendOrder async thunk)', () => {
    let store: any;
    let mockSendOrderApi: jest.SpyInstance;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                order: orderReducer,
                burgerConstructor: (state = {}) => state
            },
            preloadedState: {
                order: {
                    orderRequest: false,
                    orderSuccess: false,
                    order: null,
                    error: null
                },
                burgerConstructor: {
                    bun: mockBun,
                    ingredients: [mockIngredient1, mockIngredient2]
                }
            }
        });
        mockSendOrderApi = jest.spyOn(BurgerApi, 'sendOrderApi').mockResolvedValue(mockOrderResponse);
    });

    afterEach(() => {
        mockSendOrderApi.mockRestore();
    });

    it('sendOrder should successfully send order with correct ingredients order', async () => {
        await store.dispatch(sendOrder());
        expect(mockSendOrderApi).toHaveBeenCalledWith([
            'bun-id-1',
            'main-id-1',
            'sauce-id-1',
            'bun-id-1'
        ]);
        const state = store.getState().order;
        expect(state.orderRequest).toBe(false);
        expect(state.orderSuccess).toBe(true);
        expect(state.order).toEqual(mockOrderResponse);
        expect(state.error).toBeNull();
    });
    it('should sendOrder reject if no bun is selected', async () => {
        mockSendOrderApi.mockRestore();
        mockSendOrderApi = jest.spyOn(BurgerApi, 'sendOrderApi').mockRejectedValue(new Error('Test error'));
        store = configureStore({
            reducer: {
                order: orderReducer,
                burgerConstructor: (state = {}) => state
            },
            preloadedState: {
                order: {
                    orderRequest: false,
                    orderSuccess: false,
                    order: null,
                    error: null
                },
                burgerConstructor: {
                    bun: null,
                    ingredients: [mockIngredient1, mockIngredient2]
                }
            }
        });
        const resultAction = await store.dispatch(sendOrder());
        expect(resultAction.type).toBe('order/sendOrder/rejected');
        expect(resultAction.payload).toBe('Нужно выбрать булку');
        const state = store.getState().order;
        expect(state.orderRequest).toBe(false);
        expect(state.orderSuccess).toBe(false);
        expect(state.error).toBe('Нужно выбрать булку');
    });
});
