import {AppHeader} from "../components/app-header/AppHeader";
import {BurgerIngredients} from "../components/burger-ingredients/BurgerIngredients";
import {BurgerConstructor} from "../components/burger-constructor/BurgerConstructor";

export const MainPage = () => {
    return (
        <>
            <AppHeader />
            <main>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </>
    );
};