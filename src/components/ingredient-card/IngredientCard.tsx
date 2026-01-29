import {IngredientCardMiniProps} from "../../types/ComponentTypes";
import styles from './IngredientCard.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";
import {useRef} from "react";

export const IngredientCard = ({ingredient, onClick}: IngredientCardMiniProps) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'ingredient',
        item: { ingredient },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const ref = useRef<HTMLDivElement>(null);
    drag(ref);

    const handleClick = () => {
        onClick(ingredient);
    };

    return (
        <div ref={ref} className={`${styles.card} ml-4 mr-2 ${isDragging ? styles.draggingItem : ''}`} onClick={handleClick} >
            {ingredient.counter > 0 && <Counter count={ingredient.counter} size="default" />}
            <img src={ingredient.image} alt={ingredient.name} className={`${styles.image} ml-4 mr-4`}/>
            <div className={`${styles.priceContainer} mt-1`}>
                <span className="text text_type_digits-default">{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${styles.nameContainer} text text_type_main-small mt-1`}>
                {ingredient.name}
            </p>
        </div>
    );
};