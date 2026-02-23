import {useEffect, useState} from 'react';
import styles from './MainPage.module.css';
import {BurgerIngredients} from "../../components/burger-ingredients/BurgerIngredients";
import {BurgerConstructor} from "../../components/burger-constructor/BurgerConstructor";
import {Modal} from "../../components/modal/Modal";
import {OrderDetails} from "../../components/order-details/OrderDetails";
import {selectIngredients, useAppDispatch, useAppSelector} from "../../services/RootReducer";
import {fetchIngredients, resetIngredientsCounter} from "../../services/slices/IngredientsSlice";
import {resetOrder, sendOrder} from "../../services/slices/OrderSlice";
import {resetConstructor} from "../../services/slices/BurgerConstructorSlice";

export const MainPage = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector(selectIngredients);
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
        dispatch(resetConstructor());
        dispatch(resetIngredientsCounter());
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
