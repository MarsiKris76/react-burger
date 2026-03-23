import styles from './OrderDetailsPage.module.css';
import {OrderCard} from "../../components/order-card/OrderCard";
import {useEffect} from "react";
import {fetchIngredients, ingredientsSelectors} from "../../services/slices/IngredientsSlice";
import {feedSelectors, wsConnect, wsDisconnect} from "../../services/slices/FeedSlice";
import {useAppDispatch, useAppSelector} from "../../services/RootReducer";

export const OrderDetailsPage = () => {
    const dispatch = useAppDispatch();
    const { ingredients, loading } = useAppSelector(ingredientsSelectors.selectIngredientsData);
    const { wsConnecting, wsConnected } = useAppSelector(feedSelectors.selectFeed);

    useEffect(() => {
        if (!ingredients.length && loading) {
            dispatch(fetchIngredients());
        }
        if (!wsConnected && !wsConnecting) dispatch(wsConnect('wss://norma.education-services.ru/orders/all'));
        return () => {
            dispatch(wsDisconnect());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.container}>
            <OrderCard />
        </div>
    );
};
