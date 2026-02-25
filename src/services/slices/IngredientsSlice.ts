import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Ingredient} from "../../types/ComponentTypes";
import {IngredientsState} from "../../types/StoreTypes";
import {getIngredientsApi} from "../../utils/BurgerApi";

export const fetchIngredients = createAsyncThunk(
    'ingredients/fetchIngredients',
    async (_, { rejectWithValue, getState}) => {
        try {
            const state = getState() as { ingredients: IngredientsState };
            const existingCounters = new Map(state.ingredients.items.map(item => [item._id, item.counter]));
            const apiIngredients = await getIngredientsApi();
            return apiIngredients.map(ingredient => ({
                ...ingredient,
                counter: existingCounters.get(ingredient._id) || 0
            }));
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
                    ...ingredient
                }));
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
    selectors: {
        selectIngredientsData: (state) => ({
            ingredients: state.items,
            loading: state.loading,
            error: state.error
          })
    },
});

export const {
    incrementIngredientCounter,
    decrementIngredientCounter,
    resetIngredientsCounter
} = ingredientsSlice.actions;

export const {
  reducer: ingredientsReducer,
  selectors: ingredientsSelectors,
} = ingredientsSlice;
