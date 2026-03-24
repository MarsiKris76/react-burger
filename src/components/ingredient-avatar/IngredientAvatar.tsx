import styles from "./IngredientAvatar.module.css";
import {IngredientAvatarProps} from "../../types/ComponentTypes";

export const IngredientAvatar = ({ingredient, index = 0, length = 1}: IngredientAvatarProps) => {
    return (
        <div key={`${ingredient._id}+${index}`}
             className={styles.ingredientImage}
             style={{
                 zIndex: length - index,
                 marginLeft: index > 0 ? '-20px' : '0'
             }}
        >
            <img src={ingredient.image_mobile || ingredient.image} alt={ingredient.name} />
        </div>
    );
}