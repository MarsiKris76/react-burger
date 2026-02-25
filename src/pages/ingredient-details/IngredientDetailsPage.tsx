import styles from './IngredientDetailsPage.module.css';
import {useParams} from 'react-router-dom';
import {selectIngredients, useAppDispatch, useAppSelector} from "../../services/RootReducer";
import {IngredientDetails} from "../../components/ingredient-details/IngredientDetails";
import {fetchIngredients} from "../../services/slices/IngredientsSlice";
import {useEffect} from "react";
import {setCurrentIngredient} from "../../services/slices/ViewIngredientSlice";

export const IngredientDetailsPage = () => {
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
            <h1 className="text text_type_main-large mb-5">Детали ингредиента</h1>
            <IngredientDetails />
        </div>
    );
};
