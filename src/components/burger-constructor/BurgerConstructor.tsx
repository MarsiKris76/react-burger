import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import {BurgerConstructorProps} from "../../types/ComponentTypes";
import {testBun, testIngredients} from "../../utils/Data";

export const BurgerConstructor = ({ onOrderClick }: BurgerConstructorProps) => {

    const totalPrice = testBun.price + testIngredients.reduce((sum, item) => sum + item.price, 0);

    return (
        <section className={`${styles.section} mt-25 pr-4 pl-4`}>
            <div>
                <div className={`${styles.bunContainer} mb-4 pl-6 ml-8`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${testBun.name} (верх)`}
                        price={testBun.price}
                        thumbnail={testBun.image}
                    />
                </div>

                <div className={`${styles.ingredientsContainer} custom-scroll mb-4 pl-6`}>
                    {testIngredients.map((ingredient, index) => (
                        <div key={index} className={`${styles.ingredientWrapper} mb-2`}>
                            <DragIcon type="primary" />
                            <div key={index} className="mb-2">
                                <ConstructorElement
                                    isLocked={false}
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                    handleClose={() => console.log('Remove ingredient')}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`${styles.bunContainer} pl-6 ml-8`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${testBun.name} (низ)`}
                        price={testBun.price}
                        thumbnail={testBun.image}
                    />
                </div>
            </div>

            <div className={`${styles.footer} mt-10`}>
                <div className={`${styles.priceContainer} mr-10`}>
                    <span className="text text_type_digits-medium">{totalPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={onOrderClick}
                >
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
};
