import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Ingredient} from "../../types/ComponentTypes";
import {IngredientsState} from "../../types/StoreTypes";
import {getIngredientsApi} from "../../utils/BurgerApi";

export const fetchIngredients = createAsyncThunk(
    'ingredients/fetchIngredients',
    async (_, { rejectWithValue }) => {
        try {
            return await getIngredientsApi();
        } catch (error: any) {
            return rejectWithValue(error.message || 'Неизвестная ошибка');
        }
    }
);

const initialState: IngredientsState = {
    items: [],
    loading: false,
    error: null,
};

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        incrementIngredientCounter: (state, action: PayloadAction<string>) => {
            const ingredient = state.items.find(item => item._id === action.payload);
            if (ingredient) {
                ingredient.counter += 1;
            }
        },
        decrementIngredientCounter: (state, action: PayloadAction<string>) => {
            const ingredient = state.items.find(item => item._id === action.payload);
            if (ingredient && ingredient.counter > 0) {
                ingredient.counter -= 1;
            }
        },
        resetIngredientsCounter: (state) => {
            state.items = state.items.map(item => ({
                ...item,
                counter: 0
            }));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchIngredients.fulfilled, (state, action: PayloadAction<Ingredient[]>) => {
                state.loading = false;
                // Инициализируем счётчики при получении ингредиентов
                state.items = action.payload.map(ingredient => ({
                    ...ingredient,
                    counter: 0
                }));
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    incrementIngredientCounter,
    decrementIngredientCounter,
    resetIngredientsCounter
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
