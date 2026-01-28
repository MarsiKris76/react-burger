import {useEffect, useState} from 'react';
import styles from './App.module.css';
import {AppHeader} from "../app-header/AppHeader";
import {BurgerIngredients} from "../burger-ingredients/BurgerIngredients";
import {BurgerConstructor} from "../burger-constructor/BurgerConstructor";
import {Modal} from "../modal/Modal";
import {OrderDetails} from "../order-details/OrderDetails";
import {useDispatch, useSelector} from "react-redux";
import {selectIngredients} from "../../services/RootReducer";
import {fetchIngredients} from "../../services/slices/IngredientsSlice";
import {AppDispatch} from "../../types/StoreTypes";
import {resetOrder, sendOrder} from "../../services/slices/OrderSlice";

function App() {
    const dispatch: AppDispatch = useDispatch();
    const { loading, error } = useSelector(selectIngredients);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    const handleOrderClick = () => {
        dispatch(sendOrder());
        setIsOrderModalOpen(true);
    };

    const handleCloseOrderModal = () => {
        setIsOrderModalOpen(false);
        dispatch(resetOrder());
    };

    if (loading) {
        return <p className="text text_type_main-large text_color_inactive mt-10">Загрузка...</p>;
    }

    if (error) {
        console.error(error);
        return <p className="text text_type_main-large text_color_error mt-10">Ошибка сетевого запроса</p>;
    }

    return (
        <>
            <AppHeader />
            <main className={styles.main}>
                <div className={styles.content}>
                    <BurgerIngredients />
                    <BurgerConstructor onOrderClick={handleOrderClick}/>
                </div>
            </main>
              {isOrderModalOpen && (
                  <Modal title="" onClose={handleCloseOrderModal}>
                      <OrderDetails />
                  </Modal>
              )}
        </>
    );
}

export default App;
