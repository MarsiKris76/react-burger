import styles from './OrdersPage.module.css';
import {useAppSelector} from "../../services/RootReducer";
import {feedSelectors} from "../../services/slices/FeedSlice";
import {OrdersList} from "../../components/orders-list/OrdersList";
import {Order} from "../../types/ApiTypes";
import {OrdersNumbers} from "../../components/orders-numders/OrderNumbers";

const chunkOrders = (arr: Order[], size: number) => {
    const chunks: Order[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
};

export const OrdersPage = () => {
    const { orders, total, totalToday } = useAppSelector(feedSelectors.selectFeed);
    const doneOrders = orders.filter(order => order.status === 'done');
    const pendingOrders = orders.filter(order => order.status === 'pending');
    const doneColumns = chunkOrders(doneOrders, 10);
    const pendingColumns = chunkOrders(pendingOrders, 10);

    return (
        <main className={styles.main}>
            <div className={styles.content}>
                <OrdersList withAuthorization={false} title={"Лента заказов"}/>
                <div className="mt-25">
                    {doneColumns.length > 0 && (<OrdersNumbers title={"Готовы:"} orders={doneColumns} isDone={true}/>)}
                    {pendingColumns.length > 0 && (<OrdersNumbers title={"В работе:"} orders={pendingColumns}/>)}
                    <div>
                        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
                        <p className="text text_type_digits-large">{total}</p>
                    </div>
                    <div>
                        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
                        <p className="text text_type_digits-large">{totalToday}</p>
                    </div>
                </div>
            </div>
        </main>
    );
};
