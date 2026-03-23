import styles from "./OrdersList.module.css";
import {OrderCard} from "../order-card/OrderCard";
import {OrdersPageProps} from "../../types/ComponentTypes";

export const OrdersList = ({ orders }: OrdersPageProps) => {
    return (
        <div className={styles.ordersColumn}>
            <h1 className={`text text_type_main-large mt-10 mb-5`}>Лента заказов</h1>
            <div className={styles.ordersContainer}>
                <ul className={styles.ordersList}>
                    {orders.slice(0, 10).map(order => (
                        <OrderCard key={order._id} order={order} />
                    ))}
                </ul>
            </div>
        </div>
    );
}
