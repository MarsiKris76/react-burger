import {IngredientCardMiniProps} from "../../types/Types";
import styles from './IngredientCard.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const IngredientCard = ({ingredient, count = 0, onClick}: IngredientCardMiniProps) => {

    const handleClick = () => {
        onClick(ingredient);
    };

    return (
        <div className={`${styles.card} ml-4 mr-2`} onClick={handleClick}>
            {count > 0 && <Counter count={count} size="default" />}
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