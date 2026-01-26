import {useEffect, useState} from 'react';
import styles from './App.module.css';
import {AppHeader} from "../app-header/AppHeader";
import {BurgerIngredients} from "../burger-ingredients/BurgerIngredients";
import {BurgerConstructor} from "../burger-constructor/BurgerConstructor";
import {Ingredient} from "../../types/ComponentTypes";
import {getIngredientsApi} from "../../utils/BurgerApi";
import {Modal} from "../modal/Modal";
import {OrderDetails} from "../order-details/OrderDetails";
import {Provider} from "react-redux";
import {store} from "../../services/RootReducer";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

    useEffect(() => {
        getIngredientsApi()
            .then((data) => {
                setIngredients(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleOrderClick = () => {
        setIsOrderModalOpen(true);
    };

    const handleCloseOrderModal = () => {
        setIsOrderModalOpen(false);
    };

    if (loading) {
        return <p className="text text_type_main-large text_color_inactive mt-10">Загрузка...</p>;
    }

    if (error) {
        console.error(error);
        return <p className="text text_type_main-large text_color_error mt-10">Ошибка сетевого запроса</p>;
    }

    return (
        <Provider store={store}>
            <DndProvider backend={HTML5Backend}>
                <AppHeader />
                <main className={styles.main}>
                    <div className={styles.content}>
                        <BurgerIngredients ingredients={ingredients} />
                        <BurgerConstructor onOrderClick={handleOrderClick} />
                    </div>
                </main>
                  {isOrderModalOpen && (
                      <Modal title="" onClose={handleCloseOrderModal}>
                          <OrderDetails />
                      </Modal>
                  )}
            </DndProvider>
        </Provider>
    );
}

export default App;
