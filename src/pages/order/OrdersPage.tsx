import styles from './OrdersPage.module.css';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../services/RootReducer";
import {feedSelectors, wsConnect, wsDisconnect} from "../../services/slices/FeedSlice";
import {OrdersList} from "../../components/orders-list/OrdersList";
import {Order} from "../../types/ApiTypes";

const chunkOrders = (arr: Order[], size: number) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
};

export const OrdersPage = () => {
    const dispatch = useAppDispatch();
    const { orders, total, totalToday } = useAppSelector(feedSelectors.selectFeed);
    const doneOrders = orders.filter(order => order.status === 'done');
    const pendingOrders = orders.filter(order => order.status === 'pending');
    const doneColumns = chunkOrders(doneOrders, 10);
    const pendingColumns = chunkOrders(pendingOrders, 10);

    useEffect(() => {
        dispatch(wsConnect('wss://norma.education-services.ru/orders/all'));
        return () => {
          dispatch(wsDisconnect());
        };
    }, [dispatch]);

    return (
        <main className={styles.main}>
            <div className={styles.content}>
                <OrdersList orders={orders}/>
                <div className={`mt-25 ${styles.statsColumn}`}>
                    {doneColumns.length > 0 && (
                        <>
                            <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
                            {doneColumns.map((columnOrders: Order[], index) => (
                                <div key={index} className={styles.column}>
                                    {columnOrders.map((order: Order) => (
                                        <span key={order._id} className={`${styles.doneOrderNumber} text text_type_digits-default mb-2`}>
                                            {order.number}
                                        </span>
                                    ))}
                                </div>
                            ))}
                        </>
                    )}
                    {pendingColumns.length > 0 && (
                        <>
                            <h3 className="text text_type_main-medium mb-6">В работе:</h3>
                            {pendingColumns.map((columnOrders, index) => (
                                <div key={index} className={styles.column}>
                                    {columnOrders.map((order: Order) => (
                                        <span key={order._id} className="text text_type_digits-default mb-2">
                                            {order.number}
                                        </span>
                                    ))}
                                </div>
                            ))}
                        </>
                    )}
                    <div>
                        <h3 className="text text_type_main-medium mb-6">Выполнено за все время:</h3>
                        <p className="text text_type_digits-large">{total}</p>
                    </div>
                    <div>
                        <h3 className="text text_type_main-medium mb-6">Выполнено за сегодня:</h3>
                        <p className="text text_type_digits-large">{totalToday}</p>
                    </div>
                </div>
            </div>
        </main>
    );
};
