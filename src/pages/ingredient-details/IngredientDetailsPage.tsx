import styles from './IngredientDetailsPage.module.css';
import {IngredientDetails} from "../../components/ingredient-details/IngredientDetails";

export const IngredientDetailsPage = () => {

    return (
        <div className={styles.container}>
            <h1 className="text text_type_main-large mb-5">Детали ингредиента</h1>
            <IngredientDetails />
        </div>
    );
};
