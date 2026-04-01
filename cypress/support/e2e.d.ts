declare namespace Cypress {
    interface Chainable {
        drag(
            target: string | JQuery<HTMLElement>,
            options?: Partial<{
                position: 'topLeft' | 'top' | 'topRight' | 'left' | 'center' | 'right' | 'bottomLeft' | 'bottom' | 'bottomRight';
                x: number;
                y: number;
                clickOptions: Partial<Cypress.ClickOptions>;
                force: boolean;
                waitForElements: boolean;
                axis: 'x' | 'y';
                eventProperties: object;
            }>
        ): Chainable<JQuery<HTMLElement>>;
    }
}
