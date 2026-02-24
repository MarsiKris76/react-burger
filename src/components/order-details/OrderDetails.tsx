import {FC} from 'react';
import styles from './OrderDetails.module.css';
import {selectOrder, useAppSelector} from "../../services/RootReducer";

export const OrderDetails: FC = () => {
    const { order, orderRequest, error } = useAppSelector(selectOrder);

    if (orderRequest) {
        return (
            <div className={styles.container}>
                <p className="text text_type_main-medium">Загрузка...</p>
            </div>
        );
    }

    if (error) {
        console.error(error);
        return (
            <div className={styles.container}>
                <p className="text text_type_main-medium text_color_error">Ошибка оформления заказа</p>
            </div>
        );
    }

    if (!order) {
        return (
            <div className={styles.container}>
                <p className="text text_type_main-medium">Заказ не найден</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.orderNumber}>
                <span className="text text_type_digits-large">{order.order.number}</span>
            </div>

            <p className="text text_type_main-medium mt-8">идентификатор заказа</p>

            <div className={styles.checkMark}>
                <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="60" cy="60" r="60" fill="#8585AD" opacity="0.3"/>
                    <circle cx="60" cy="60" r="50" fill="#4C4CFF"/>
                    <path d="M36 62L52 78L84 46" stroke="white" strokeWidth="6" fill="none"/>
                </svg>
            </div>
            <p className="text text_type_main-medium mt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mt-2">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
};
