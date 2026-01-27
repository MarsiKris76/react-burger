import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {sendOrderApi} from '../../utils/BurgerApi';
import {OrderState, RootState} from "../../types/StoreTypes";

export const sendOrder = createAsyncThunk(
    'order/sendOrder',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = (getState() as RootState);
            const { bun, ingredients } = state.burgerConstructor;
            if (!bun) {
                throw new Error('Нужно выбрать булку');
            }
            const ingredientsIds = [
                bun._id,
                ...ingredients.map(ing => ing._id),
                bun._id
            ];
            return await sendOrderApi(ingredientsIds);
        } catch (error: any) {
            return rejectWithValue(error.message || 'Неизвестная ошибка');
        }
    }
);

const initialState: OrderState = {
    orderRequest: false,
    orderSuccess: false,
    order: null,
    error: null,
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        resetOrder: (state) => {
            state.orderRequest = false;
            state.orderSuccess = false;
            state.order = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendOrder.pending, (state) => {
                state.orderRequest = true;
                state.orderSuccess = false;
                state.error = null;
            })
            .addCase(sendOrder.fulfilled, (state, action: PayloadAction<any>) => {
                state.orderRequest = false;
                state.orderSuccess = true;
                state.order = action.payload;
            })
            .addCase(sendOrder.rejected, (state, action) => {
                state.orderRequest = false;
                state.orderSuccess = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
