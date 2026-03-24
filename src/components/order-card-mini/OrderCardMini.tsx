import styles from './OrderCardMini.module.css';
import {OrderCardProps} from "../../types/ComponentTypes";
import {Link, useLocation} from "react-router-dom";
import {useAppSelector} from "../../services/RootReducer";
import {ingredientsSelectors} from "../../services/slices/IngredientsSlice";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {totalPrice} from "../../utils/Utils";
import {IngredientAvatar} from "../ingredient-avatar/IngredientAvatar";

export const OrderCardMini = ({ order, withStatus }: OrderCardProps) => {
    const location = useLocation();
    const allIngredients = useAppSelector(ingredientsSelectors.selectIngredientsItems);
    const orderIngredients = order.ingredients
        .map(ingredientId => allIngredients.find(ingredient => ingredient._id === ingredientId))
        .filter(Boolean) as typeof allIngredients;
    const orderUrl = `${location.pathname}/${order._id}`;

    const statusConfig = {
        done: { text: 'Выполнен', className: styles.statusDone },
        pending: { text: 'Готовится', className: styles.statusPending },
        created: { text: 'Создан', className: styles.statusCreated }
    };

    const statusInfo = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.created;

    return (
        <Link to={orderUrl} state={{ backgroundLocation: location }} className={styles.cardLink}>
            <div className={`${styles.card} p-6`}>
                <div className={styles.header}>
                    <p className="text text_type_digits-default"># {order.number}</p>
                    <p className="text text_type_main-default text_color_inactive">
                        <FormattedDate date={new Date(order.createdAt)} />
                    </p>
                </div>
                <h3 className={`text text_type_main-medium mt-6 mb-2 ${styles.title}`}>
                    {order.name}
                </h3>
                {withStatus && (
                    <p className={`text text_type_main-default mb-6 ${statusInfo.className}`}>
                        {statusInfo.text}
                    </p>
                )}
                <div className={styles.footer}>
                    <div className={styles.ingredientsPreview}>
                        {orderIngredients.slice(0, 6).map((ingredient, index) => (
                            ingredient && (<IngredientAvatar key={`${ingredient._id}-${index}`} ingredient={ingredient} index={index} length={orderIngredients.length} />)
                        ))}
                        {orderIngredients.length > 6 && (
                            <div className={`${styles.remaining} text text_type_digits-default`}>
                                +{orderIngredients.length - 6}
                            </div>
                        )}
                    </div>
                    <div className={styles.price}>
                        <span className="text text_type_digits-default mr-2">{totalPrice(orderIngredients)}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </Link>
    );
};
