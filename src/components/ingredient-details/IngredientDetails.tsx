import styles from './IngredientDetails.module.css';
import {selectViewIngredient, useAppSelector} from "../../services/RootReducer";

export const IngredientDetails = () => {
    const ingredient = useAppSelector(selectViewIngredient);

    if (!ingredient) {
        return (
            <div className={styles.container}>
                <p className="text text_type_main-medium">Ингредиент не найден</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <img
                src={ingredient.image_large || ingredient.image}
                alt={ingredient.name}
                className={styles.image}
            />

            <h3 className={`text text_type_main-medium mt-4 mb-8 ${styles.title}`}>
                {ingredient.name}
            </h3>

            <div className={styles.nutrition}>
                <div className={styles.nutritionItem}>
                    <p className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</p>
                    <p className="text text_type_digits-default">{ingredient.calories}</p>
                </div>

                <div className={styles.nutritionItem}>
                    <p className="text text_type_main-default text_color_inactive mb-2">Белки, г</p>
                    <p className="text text_type_digits-default">{ingredient.proteins}</p>
                </div>

                <div className={styles.nutritionItem}>
                    <p className="text text_type_main-default text_color_inactive mb-2">Жиры, г</p>
                    <p className="text text_type_digits-default">{ingredient.fat}</p>
                </div>

                <div className={styles.nutritionItem}>
                    <p className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</p>
                    <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
                </div>
            </div>
        </div>
    );
};