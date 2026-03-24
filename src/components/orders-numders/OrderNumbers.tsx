import styles from "./OrderNumbers.module.css"
import {Order} from "../../types/ApiTypes";
import {OrderNumbersProps} from "../../types/ComponentTypes";

export const OrdersNumbers = ({ title, orders, isDone }: OrderNumbersProps) => {
    return (
        <>
            <h3 className="text text_type_main-medium mb-6">{title}</h3>
            <div className={`${styles.statsColumn}`}>
                {orders.map((columnOrders: Order[], index) => (
                    <div key={index} className={styles.column}>
                        {columnOrders.map((order: Order) => (
                            <span key={order._id} className={`${isDone ? styles.doneOrderNumber : ''} text text_type_digits-default mb-2`}>
                                {order.number}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}
