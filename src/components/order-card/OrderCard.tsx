import styles from './OrderCard.module.css';
import {useAppDispatch, useAppSelector} from "../../services/RootReducer";
import {fetchIngredients, ingredientsSelectors} from "../../services/slices/IngredientsSlice";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useParams} from "react-router-dom";
import {feedSelectors} from "../../services/slices/FeedSlice";
import {Order} from "../../types/ApiTypes";
import {totalPrice} from "../../utils/Utils";
import {IngredientAvatar} from "../ingredient-avatar/IngredientAvatar";
import {useEffect} from "react";

const getStatusText = (status: string): string => {
    return status === 'done'
        ? 'Выполнен'
        : status === 'pending'
            ? 'Готовится'
            : 'Создан';
}

export const OrderCard= () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const allIngredients = useAppSelector(ingredientsSelectors.selectIngredientsItems);
    const loading = useAppSelector(ingredientsSelectors.selectIngredientsLoading);
    const { orders: allOrders, wsConnecting } = useAppSelector(feedSelectors.selectFeed);

    useEffect(() => {
        if (!allIngredients.length) dispatch(fetchIngredients());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading || wsConnecting) {
        return <p className="text text_type_main-large text_color_inactive mt-10">Загрузка...</p>;
    }

    const order: Order | undefined = allOrders.find(o => o._id === id);

    if (!order) {
        return (
            <div className={styles.container}>
                <p className="text text_type_main-medium">Заказ не найден</p>
            </div>
        );
    }

    const orderIngredients = order.ingredients
        .map(ingredientId => allIngredients.find(ingredient => ingredient._id === ingredientId))
        .filter(Boolean) as typeof allIngredients;

    return (
        <div className={styles.container}>
            <p className={`text text_type_digits-default mb-10 ${styles.orderNumber}`}>
                #{order.number}
            </p>
            <h3 className="text text_type_main-medium mb-3">
                {order.name}
            </h3>
            <p className={`text text_type_main-default mb-15 ${
                order.status === 'done'
                    ? styles.statusDone
                    : order.status === 'pending'
                        ? styles.statusPending
                        : ""
            }`}>
                {getStatusText(order.status)}
            </p>
            <p className="text text_type_main-medium mb-6">Состав:</p>
            <div className={`${styles.ingredientsList} mb-10 pr-3`}>
                {orderIngredients.map((ingredient, index) => (
                    <div key={`${ingredient._id}-${index}`} className={styles.ingredientItem}>
                        <div className={`mb-3 ${styles.ingredientInfo}`}>
                            <IngredientAvatar ingredient={ingredient}/>
                            <p className="text text_type_main-default ml-4">{ingredient.name}</p>
                        </div>
                        <div className={styles.priceInfo}>
                            <span className="text text_type_digits-default mr-2">
                                {order.ingredients.filter(id => id === ingredient._id).length} x {ingredient.price}
                            </span>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.footer}>
                <p className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={new Date(order.createdAt)} />
                </p>
                <div className={styles.totalPrice}>
                    <span className="text text_type_digits-default mr-2">{totalPrice(orderIngredients)}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
};
