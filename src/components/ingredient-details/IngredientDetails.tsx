import styles from './IngredientDetails.module.css';
import {selectIngredients, useAppDispatch, useAppSelector} from "../../services/RootReducer";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {fetchIngredients} from "../../services/slices/IngredientsSlice";
import {setCurrentIngredient} from "../../services/slices/ViewIngredientSlice";

export const IngredientDetails = () => {

    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const { loading, items: ingredients } = useAppSelector(selectIngredients);

    useEffect(() => {
        if (ingredients.length === 0) {
            dispatch(fetchIngredients());
        }
    }, [dispatch, ingredients.length]);

    const ingredient = ingredients.find(item => item._id === id);

    useEffect(() => {
        if (ingredient) {
            dispatch(setCurrentIngredient(ingredient));
        }
    }, [dispatch, ingredient]);

    if (loading) {
        return <p className="text text_type_main-large text_color_inactive mt-10">Загрузка...</p>;
    }

    if (!ingredient) {
        return (
            <div className={styles.container}>
                <h2 className="text text_type_main-large">Ингредиент не найден</h2>
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