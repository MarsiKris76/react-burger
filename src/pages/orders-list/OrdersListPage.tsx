import styles from './OrdersListPage.module.css';
import {OrdersLst} from "../../components/orders-list/OrdersLst";

export const OrdersListPage = () => {

    return (
        <div className={styles.container}>
            <OrdersLst />
        </div>
    );
};