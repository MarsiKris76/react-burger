import {BURGER_CONSTRUCTOR_SELECTORS} from "../../src/tests/TestConstants";

describe('Burger constructor', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    it('should order be assembled and created', () => {
        cy.get(BURGER_CONSTRUCTOR_SELECTORS.bun).scrollIntoView().eq(0).should('exist').drag(BURGER_CONSTRUCTOR_SELECTORS.dropTarget);
        cy.get(BURGER_CONSTRUCTOR_SELECTORS.sauce).scrollIntoView().eq(0).should('exist').drag(BURGER_CONSTRUCTOR_SELECTORS.dropTarget);
        cy.get(BURGER_CONSTRUCTOR_SELECTORS.main).scrollIntoView().eq(0).should('exist').drag(BURGER_CONSTRUCTOR_SELECTORS.dropTarget);
        cy.get(BURGER_CONSTRUCTOR_SELECTORS.bunInConstructor).should('exist'); // проверяем ингредиенты появилась в конструкторе
        cy.get(BURGER_CONSTRUCTOR_SELECTORS.sauceInConstructor).should('exist');
        cy.get(BURGER_CONSTRUCTOR_SELECTORS.mainInConstructor).should('exist');
        cy.get(BURGER_CONSTRUCTOR_SELECTORS.sendOrderButton).click();
        cy.get('#root [name="email"]').type('greenheatforlife@yandex.ru'); //такое, конечно, надо в переменные вынести
        cy.get('#root [name="password"]').type('Gfhjkm76'); //такое, конечно, надо в переменные вынести
        cy.get(BURGER_CONSTRUCTOR_SELECTORS.loginButton).click();
        cy.get(BURGER_CONSTRUCTOR_SELECTORS.sendOrderButton).click();
        cy.get(BURGER_CONSTRUCTOR_SELECTORS.modalHeader).should('exist');// модальное окно заказа появилось, значит считаем что заказ ушёл
        cy.get(BURGER_CONSTRUCTOR_SELECTORS.modalButton).click();
        cy.get(BURGER_CONSTRUCTOR_SELECTORS.bunInConstructor).should('not.exist'); //конструктор очистился
        cy.get(BURGER_CONSTRUCTOR_SELECTORS.bunInConstructor).should('not.exist');
        cy.get(BURGER_CONSTRUCTOR_SELECTORS.bunInConstructor).should('not.exist');
        cy.get(BURGER_CONSTRUCTOR_SELECTORS.modalHeader).should('not.exist');
    });

    it('should modal window with the ingredient opens', () => {
        cy.get(BURGER_CONSTRUCTOR_SELECTORS.bun).click();
        cy.get(BURGER_CONSTRUCTOR_SELECTORS.modalHeader).should('be.visible');
        cy.get('[data-testid="ingredient-title"]').should('exist');
        cy.get('[data-testid="nutrition-label-calories"]').should('exist');
        cy.get('[data-testid="nutrition-label-proteins"]').should('exist');
        cy.get('[data-testid="nutrition-label-fat"]').should('exist');
        cy.get('[data-testid="nutrition-label-carbs"]').should('exist');
        cy.get('[data-testid="ingredient-img"]').should('exist');
        cy.get(BURGER_CONSTRUCTOR_SELECTORS.modalButton).click();
        cy.get(BURGER_CONSTRUCTOR_SELECTORS.modalHeader).should('not.exist');
    });
});

export {}
