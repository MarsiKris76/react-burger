import React, { useRef } from 'react';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import styles from './BurgerConstructor.module.css';
import {BurgerConstructorProps, Ingredient} from "../../types/ComponentTypes";
import {decrementIngredientCounter, incrementIngredientCounter} from "../../services/slices/IngredientsSlice";
import {ConstructorItem} from "../constructor-item/ConstructorItem";
import {selectBurgerConstructor, useAppDispatch, useAppSelector} from "../../services/RootReducer";
import {addIngredient, removeIngredient, replaceBun} from "../../services/slices/BurgerConstructorSlice";

export const BurgerConstructor: React.FC<BurgerConstructorProps> = ({ onOrderClick } ) => {
    const dispatch = useAppDispatch();
    const { bun, ingredients } = useAppSelector(selectBurgerConstructor);
    const dropRef = useRef<HTMLDivElement>(null);

    const [{ isOver }, drop] = useDrop({
        accept: 'ingredient',
        drop: (item: { ingredient: Ingredient }) => {
            if (item.ingredient.type === 'bun') {
                if (bun && bun._id !== item.ingredient._id)
                    dispatch(decrementIngredientCounter(bun._id));
                if (item.ingredient.counter < 1)
                    dispatch(incrementIngredientCounter(item.ingredient._id));
                dispatch(replaceBun(item.ingredient));
            } else {
                dispatch(addIngredient(item.ingredient));
                dispatch(incrementIngredientCounter(item.ingredient._id));
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    React.useEffect(() => {
        if (dropRef.current) {
            drop(dropRef.current);
        }
    }, [drop]);

    const totalPrice = React.useMemo(() => {
        const bunPrice = bun ? bun.price * 2 : 0;
        const ingredientsPrice = ingredients.reduce((sum, item) => sum + item.price, 0);
        return bunPrice + ingredientsPrice;
    }, [bun, ingredients]);

    const handleRemoveIngredient = (uuid: string) => {
        const ingredientToRemove = ingredients.find(item => item.uuid === uuid);
        if (ingredientToRemove) {
            dispatch(decrementIngredientCounter(ingredientToRemove._id));
            dispatch(removeIngredient(uuid));
        }
    };

    const handleMakeOrder = () => {
        if (!bun || ingredients.length === 0) {
            alert('Добавьте булку и хотя бы одну начинку для оформления заказа');
            return;
        }
        onOrderClick();
    };

    return (
        <section className={`${styles.section} mt-25 pr-4 pl-4`}>
            <div ref={dropRef} className={`${styles.dropZone} ${isOver ? styles.dropZoneActive : ''}`} >
                {bun ? (
                    <div className={`${styles.bunContainer} mb-4 pl-6 ml-8`}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div>
                ) : (
                    <div className={`${styles.emptySlot} mb-4 text text_type_main-default text_color_inactive pl-6 ml-8`}>
                        Перетащите булку сюда
                    </div>
                )}

                <div className={`${styles.ingredientsContainer} custom-scroll mb-4 pl-6`}>
                    {ingredients.map((ingredient, index) => (
                        <ConstructorItem
                            key={ingredient.uuid}
                            ingredient={ingredient}
                            index={index}
                            onRemove={handleRemoveIngredient}
                        />
                    ))}
                </div>

                {bun ? (
                    <div className={`${styles.bunContainer} mb-10 pl-6 ml-8`}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div>
                ) : (
                    <div className={`${styles.emptySlot} mb-10 text text_type_main-default text_color_inactive pl-6 ml-8`}>
                        Перетащите булку сюда
                    </div>
                )}
            </div>

            <div className={`${styles.footer} mt-10`}>
                <div className={`${styles.priceContainer} mr-10`}>
                    <span className="text text_type_digits-medium">{totalPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={handleMakeOrder} >
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
};