import styles from "./OrdersList.module.css";
import {OrderCardMini} from "../order-card-mini/OrderCardMini";
import {useEffect} from "react";
import {feedSelectors, wsConnect, wsDisconnect} from "../../services/slices/FeedSlice";
import {useAppDispatch, useAppSelector} from "../../services/RootReducer";
import {OrdersListProps} from "../../types/ComponentTypes";
import {getTokens} from "../../utils/Utils";

export const OrdersList = ({withAuthorization}: OrdersListProps) => {
    const dispatch = useAppDispatch();
    const { orders } = useAppSelector(feedSelectors.selectFeed);

    useEffect(() => {
        dispatch(wsConnect(withAuthorization ? `wss://norma.education-services.ru/orders?token=${getTokens().accessToken || ''}`
            : 'wss://norma.education-services.ru/orders/all'));
        return () => {
            dispatch(wsDisconnect());
        };
    }, [dispatch]);

    return (
        <div className={styles.ordersColumn}>
            <h1 className={`text text_type_main-large mt-10 mb-5`}>Лента заказов</h1>
            <div className={styles.ordersContainer}>
                <ul className={styles.ordersList}>
                    //TODO: тут ошибка
                    {orders.map(order => (
                        <OrderCardMini key={order._id} order={order} />
                    ))}
                </ul>
            </div>
        </div>
    );
}
