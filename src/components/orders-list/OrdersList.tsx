import styles from "./OrdersList.module.css";
import {OrderCardMini} from "../order-card-mini/OrderCardMini";
import {useEffect} from "react";
import {feedSelectors, wsConnect, wsDisconnect} from "../../services/slices/FeedSlice";
import {useAppDispatch, useAppSelector} from "../../services/RootReducer";
import {OrdersListProps} from "../../types/ComponentTypes";
import {getTokens} from "../../utils/Utils";
import {fetchIngredients, ingredientsSelectors} from "../../services/slices/IngredientsSlice";
import {Order} from "../../types/ApiTypes";

export const OrdersList = ({withAuthorization, title}: OrdersListProps) => {
    const dispatch = useAppDispatch();
    const ingredients = useAppSelector(ingredientsSelectors.selectIngredientsItems);
    const { orders, error } = useAppSelector(feedSelectors.selectFeed);

    useEffect(() => {
        if (!ingredients.length) dispatch(fetchIngredients());
        dispatch(wsConnect(withAuthorization ? `wss://norma.education-services.ru/orders?token=${getTokens().accessToken?.replace('Bearer ', '') || ''}`
            : 'wss://norma.education-services.ru/orders/all'));
        return () => {
            dispatch(wsDisconnect());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.ordersColumn}>
            {title && (<h1 className={`text text_type_main-large mt-10 mb-5`}>{title}</h1>)}
            {orders && orders.length ?
                (<div className={styles.ordersContainer}>
                    <ul className={styles.ordersList}>
                        {[...orders].sort((a: Order, b: Order) =>
                            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                        ).map(order => (
                            <OrderCardMini key={order._id} order={order} withStatus={withAuthorization} />
                        ))}
                    </ul>
                </div>) : (<span className="text text_type_main-medium">{error ? error : "Ждём ваших заказов"}</span>)}
        </div>
    );
}
