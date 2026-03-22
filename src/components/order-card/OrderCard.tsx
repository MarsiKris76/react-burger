import styles from './OrderCard.module.css';
import {OrderCardProps} from "../../types/ComponentTypes";
import {Link, useLocation} from "react-router-dom";
import {useAppSelector} from "../../services/RootReducer";
import {ingredientsSelectors} from "../../services/slices/IngredientsSlice";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {FC} from "react";

export const OrderCard: FC<OrderCardProps> = ({ order }) => {
    const location = useLocation();
    const allIngredients = useAppSelector(ingredientsSelectors.selectIngredientsData).ingredients;
    const orderIngredients = order.ingredients
        .map(ingredientId => allIngredients.find(ingredient => ingredient._id === ingredientId))
        .filter(Boolean) as typeof allIngredients;
    const orderUrl = `/feed/${order._id}`;

    const totalPrice = orderIngredients.reduce((sum, ingredient) => {
        return sum + (ingredient ? ingredient.price : 0);
    }, 0);

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
                <div className={styles.footer}>
                    <div className={styles.ingredientsPreview}>
                        {orderIngredients.slice(0, 6).map((ingredient, index) => (
                            ingredient && (
                                <div key={`${ingredient._id}-${index}`}
                                    className={styles.ingredientImage}
                                    style={{
                                        zIndex: orderIngredients.length - index,
                                        marginLeft: index > 0 ? '-20px' : '0'
                                    }}
                                >
                                    <img src={ingredient.image_mobile || ingredient.image} alt={ingredient.name} />
                                </div>
                            )
                        ))}
                        {orderIngredients.length > 6 && (
                            <div className={`${styles.remaining} text text_type_digits-default`}>
                                +{orderIngredients.length - 6}
                            </div>
                        )}
                    </div>
                    <div className={styles.price}>
                        <span className="text text_type_digits-default mr-2">{totalPrice}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </Link>
    );
};
