describe('Burger constructor', () => {
    const bun = '#buns-section img[alt="Флюоресцентная булка R2-D3"]';
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });
    it('should order be assembled and created', () => {
        const sauce = '#sauces-section img[alt="Соус фирменный Space Sauce"]';
        const main = '#main-section img[alt="Филе Люминесцентного тетраодонтимформа"]';
        const dropTarget = '[data-testid="constructor-drop-place"]';
        cy.get(bun).scrollIntoView().eq(0).should('exist').drag(dropTarget);
        cy.get(sauce).scrollIntoView().eq(0).should('exist').drag(dropTarget);
        cy.get(main).scrollIntoView().eq(0).should('exist').drag(dropTarget);
        const bunInConstructor = '#root div.constructor-element_pos_bottom span.constructor-element__text';
        const sauceInConstructor = '#root div:nth-child(1) > div.ConstructorItem_content__0l3gg > div.constructor-element > span.constructor-element__row > span.constructor-element__text'
        const mainInConstructor = '#root div:nth-child(2) > div.ConstructorItem_content__0l3gg > div.constructor-element > span.constructor-element__row > span.constructor-element__text'
        cy.get(bunInConstructor).should('exist'); // проверяем ингредиенты появилась в конструкторе
        cy.get(sauceInConstructor).should('exist');
        cy.get(mainInConstructor).should('exist');
        cy.get('[data-testid="send-order-button"]').click();
        cy.get('#root [name="email"]').type('greenheatforlife@yandex.ru'); //такое, конечно, надо в переменные вынести
        cy.get('#root [name="password"]').type('Gfhjkm76'); //такое, конечно, надо в переменные вынести
        cy.get('[data-testid="login-button"]').click();
        cy.get('[data-testid="send-order-button"]').click();
        cy.get('[data-testid="modal-header"]').should('exist');// модальное окно заказа появилось, значит считаем что заказ ушёл
        cy.get('[data-testid="modal-button"]').click();
        cy.get(bunInConstructor).should('not.exist'); //конструктор очистился
        cy.get(bunInConstructor).should('not.exist');
        cy.get(bunInConstructor).should('not.exist');
        cy.get('[data-testid="modal-header"]').should('not.exist');
    });

    it('should modal window with the ingredient opens', () => {
        cy.get(bun).click();
        cy.get('[data-testid="modal-header"]').should('be.visible');
        cy.get('[data-testid="ingredient-title"]').should('exist');
        cy.get('[data-testid="nutrition-label-calories"]').should('exist');
        cy.get('[data-testid="nutrition-label-proteins"]').should('exist');
        cy.get('[data-testid="nutrition-label-fat"]').should('exist');
        cy.get('[data-testid="nutrition-label-carbs"]').should('exist');
        cy.get('[data-testid="ingredient-img"]').should('exist');
        cy.get('[data-testid="modal-button"]').click();
        cy.get('[data-testid="modal-header"]').should('not.exist');
    });
});

export {}
