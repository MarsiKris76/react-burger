
import type { IngredientsState } from '../../types/StoreTypes';
import {
    decrementIngredientCounter,
    incrementIngredientCounter,
    ingredientsReducer,
    resetIngredientsCounter
} from './IngredientsSlice';
import { mockIngredients } from '../../tests/MockConstants';

jest.mock('../../utils/BurgerApi');

describe('ingredientsSlice reducers', () => {
    let initialState: IngredientsState;

    beforeEach(() => {
        initialState = {
            items: mockIngredients,
            loading: false,
            error: null
        };
    });

    it('should incrementIngredientCounter increase counter for existing ingredient', () => {
        const state = ingredientsReducer(initialState, incrementIngredientCounter('bun-id-1'));
        expect(state.items[0].counter).toBe(1); // Было 0 → стало 1
    });

    it('should incrementIngredientCounter not change state if ingredient not found', () => {
        const state = ingredientsReducer(initialState, incrementIngredientCounter('bun-id-null'));
        expect(state.items).toEqual(initialState.items);
    });

    it('should decrementIngredientCounter decrease counter if greater than 0', () => {
        const modifiedState = {
            ...initialState,
            items: [
                { ...mockIngredients[0], counter: 2 },
            ]
        };
        const state = ingredientsReducer(modifiedState, decrementIngredientCounter('bun-id-1'));
        expect(state.items[0].counter).toBe(1);
    });

    it('should decrementIngredientCounter not decrease counter below 0', () => {
        const state = ingredientsReducer(initialState, decrementIngredientCounter('bun-id-1'));
        expect(state.items[0].counter).toBe(0);
    });

    it('should resetIngredientsCounter reset all counters to 0', () => {
        const modifiedState = {
            ...initialState,
            items: [
                { ...mockIngredients[0], counter: 3 },
                { ...mockIngredients[1], counter: 5 }
            ]
        };
        const state = ingredientsReducer(modifiedState, resetIngredientsCounter());
        state.items.forEach(ingredient => {
            expect(ingredient.counter).toBe(0);
        });
    });
});
