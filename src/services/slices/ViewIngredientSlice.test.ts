import {clearCurrentIngredient, setCurrentIngredient, viewIngredientReducer, viewIngredientSelectors} from './ViewIngredientSlice';
import type {Ingredient} from '../../types/ComponentTypes';
import {mockBun, mockSauce} from "../../tests/MockConstants";

describe('viewIngredientSlice', () => {
    describe('reducers', () => {
        describe('setCurrentIngredient', () => {
            it('should set the current ingredient', () => {
                const initialState: Ingredient | null = null;
                const result = viewIngredientReducer(initialState, setCurrentIngredient(mockBun));
                expect(result).toEqual(mockBun);
            });
            it('should replace the current ingredient with a new one', () => {
                const anotherIngredient: Ingredient = mockSauce;
                const result = viewIngredientReducer(mockBun, setCurrentIngredient(anotherIngredient));
                expect(result).toEqual(anotherIngredient);
                expect(result).not.toEqual(mockBun);
            });
        });

        describe('clearCurrentIngredient', () => {
            it('should clear the current ingredient and return null', () => {
                const result = viewIngredientReducer(mockBun, clearCurrentIngredient());
                expect(result).toBeNull();
            });
            it('should return null when called on already null state', () => {
                const initialState: Ingredient | null = null;
                const result = viewIngredientReducer(initialState, clearCurrentIngredient());
                expect(result).toBeNull();
            });
        });
    });

    describe('selectors', () => {
        const testState = {
            viewIngredient: mockBun
        };

        describe('selectViewIngredientData', () => {
            it('should return ingredient data when ingredient is set', () => {
                const result = viewIngredientSelectors.selectViewIngredientData(testState);
                expect(result).toEqual({
                    ingredient: mockBun
                });
            });
            it('should return ingredient as null when no ingredient is set', () => {
                const emptyState = {
                    viewIngredient: null
                };
                const result = viewIngredientSelectors.selectViewIngredientData(emptyState);

                expect(result).toEqual({
                    ingredient: null
                });
            });
            it('should return the same structure regardless of other state properties', () => {
                const complexState = {
                    viewIngredient: mockBun,
                    otherSlice: { someData: 'test' },
                    anotherSlice: { moreData: 123 }
                };
                const result = viewIngredientSelectors.selectViewIngredientData(complexState);
                expect(result).toEqual({
                    ingredient: mockBun
                });
                expect('otherSlice' in result).toBeFalsy();
                expect('anotherSlice' in result).toBeFalsy();
            });
        });
    });

    describe('initial state', () => {
        it('should have null as initial state', () => {
            const result = viewIngredientReducer(undefined, { type: 'INIT' });
            expect(result).toBeNull();
        });
    });
});
