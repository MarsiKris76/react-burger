import {
    burgerConstructorReducer,
    addIngredient,
    removeIngredient,
    moveIngredient,
    replaceBun,
    resetConstructor
} from './BurgerConstructorSlice';
import type {BurgerConstructorState, ConstructorIngredient} from '../../types/StoreTypes';
import type {Ingredient} from '../../types/ComponentTypes';
import {mockBun, mockMain, mockMain2, mockSauce} from "../../tests/MockConstants";

jest.mock('uuid', () => ({
    v4: jest.fn().mockReturnValue('test-uuid')
}));

const createConstructorIngredient = (ingredient: Ingredient): ConstructorIngredient => ({
    ...ingredient,
    uuid: 'test-uuid-' + ingredient._id
});

describe('burgerConstructorSlice reducers', () => {
    const getInitialState = (): BurgerConstructorState => {
        // Способ 1: Использовать getState() редьюсера (подходит, если редьюсер не зависит от внешнего состояния)
        return burgerConstructorReducer(undefined, { type: '@@INIT' }); // @@INIT - стандартное действие Redux для инициализации
    };

    describe('addIngredient', () => {
        it('should add bun to state when ingredient type is bun', () => {
            const state = burgerConstructorReducer(getInitialState(), addIngredient(mockBun));
            expect(state.bun).not.toBeNull();
            expect(state.bun?._id).toBe('bun-id-1');
            expect(state.ingredients).toHaveLength(0);
        });
        it('should add ingredient to ingredients array when type is not bun', () => {
            const state = burgerConstructorReducer(getInitialState(), addIngredient(mockMain));
            expect(state.bun).toBeNull();
            expect(state.ingredients).toHaveLength(1);
            expect(state.ingredients[0]._id).toBe('main-id-1');
        });
        it('should replace existing bun when adding new bun', () => {
            let state = burgerConstructorReducer(getInitialState(), addIngredient(mockBun));
            const newBun: Ingredient = { ...mockBun, _id: '4', name: 'Другая булочка' };
            state = burgerConstructorReducer(state, addIngredient(newBun));
            expect(state.bun?._id).toBe('4');
            expect(state.bun?.name).toBe('Другая булочка');
        });
    });

    describe('removeIngredient', () => {
        it('should remove ingredient by uuid', () => {
            const ingredientWithUuid1 = createConstructorIngredient(mockMain);
            const ingredientWithUuid2 = createConstructorIngredient(mockSauce);

            const modifiedState: BurgerConstructorState = {
                ...getInitialState(),
                ingredients: [ingredientWithUuid1, ingredientWithUuid2]
            };
            const state = burgerConstructorReducer(modifiedState, removeIngredient(ingredientWithUuid1.uuid));
            expect(state.ingredients).toHaveLength(1);
            expect(state.ingredients[0].uuid).toBe(ingredientWithUuid2.uuid);
        });
        it('should not change state if ingredient with uuid not found', () => {
            const ingredientWithUuid = createConstructorIngredient(mockMain);
            const modifiedState: BurgerConstructorState = {
                ...getInitialState(),
                ingredients: [ingredientWithUuid]
            };
            const state = burgerConstructorReducer(modifiedState, removeIngredient('non-existent-uuid'));
            expect(state.ingredients).toEqual(modifiedState.ingredients);
        });
    });

    describe('moveIngredient', () => {
        it('should move ingredient from one position to another', () => {
            const ingredient1 = createConstructorIngredient(mockMain);
            const ingredient2 = createConstructorIngredient(mockSauce);
            const ingredient3 = createConstructorIngredient(mockMain2);
            const modifiedState: BurgerConstructorState = {
                ...getInitialState(),
                ingredients: [ingredient1, ingredient2, ingredient3]
            };
            const state = burgerConstructorReducer(
                modifiedState,
                moveIngredient({ from: 0, to: 2 })
            );
            expect(state.ingredients).toHaveLength(3);
            expect(state.ingredients[0]).toEqual(ingredient2);
            expect(state.ingredients[1]).toEqual(ingredient3);
            expect(state.ingredients[2]).toEqual(ingredient1);
        });
        it('should handle moving ingredient to same position', () => {
            const ingredient = createConstructorIngredient(mockMain);
            const modifiedState: BurgerConstructorState = {
                ...getInitialState(),
                ingredients: [ingredient]
            };
            const state = burgerConstructorReducer(
                modifiedState,
                moveIngredient({ from: 0, to: 0 })
            );
            expect(state.ingredients).toEqual(modifiedState.ingredients);
        });
    });

    describe('replaceBun', () => {
        it('should replace bun with new ingredient', () => {
            let state = burgerConstructorReducer(getInitialState(), addIngredient(mockBun));
            const newBun: Ingredient = { ...mockBun, _id: 'bun-id-5', name: 'Новая булочка' };
            state = burgerConstructorReducer(state, replaceBun(newBun));
            expect(state.bun?._id).toBe('bun-id-5');
            expect(state.bun?.name).toBe('Новая булочка');
        });
        it('should set bun when no bun exists', () => {
            const state = burgerConstructorReducer(getInitialState(), replaceBun(mockBun));
            expect(state.bun?._id).toBe('bun-id-1');
        });
    });

    describe('resetConstructor', () => {
        it('should reset both bun and ingredients', () => {
            const modifiedState: BurgerConstructorState = {
                bun: mockBun,
                ingredients: [createConstructorIngredient(mockMain), createConstructorIngredient(mockSauce)]
            };
            const state = burgerConstructorReducer(modifiedState, resetConstructor());
            expect(state.bun).toBeNull();
            expect(state.ingredients).toHaveLength(0);
        });
    });
});
