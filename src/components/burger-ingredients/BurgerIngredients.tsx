import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useMemo, useRef, useState} from "react";
import styles from './BurgerIngredients.module.css';
import {IBurgerIngredientsProps, Ingredient, TIngredientType} from "../../types/types";
import {IngredientCardMini} from "../ingredient-card-mini/IngredientCardMini";



export const BurgerIngredients = ({ ingredients } : IBurgerIngredientsProps) => {
    const [tab, setTab] = useState<TIngredientType>('bun')
    const bunRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const fillingRef = useRef<HTMLDivElement>(null);

    const categorizedIngredients = useMemo(() => {
        return ingredients!.reduce((acc, ingredient: Ingredient) => {
            if (!acc[ingredient.type]) {
                acc[ingredient.type] = [];
            }
            acc[ingredient.type].push(ingredient);
            return acc;
        }, {} as Record<string, Ingredient[]>);
    }, [ingredients]);

    const scrollToSection = (section: TIngredientType) => {
        setTab(section);
        const refs = { bun: bunRef, sauce: sauceRef, filling: fillingRef };
        refs[section]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };


    return (
        <section>
            <h2>Соберите бургер</h2>
            <div style={{ display: 'flex' }}>
                <Tab value="bun" active={tab === 'bun'} onClick={() => scrollToSection('bun')}>
                    Булки
                </Tab>
                <Tab value="sauce" active={tab === 'sauce'} onClick={() => scrollToSection('sauce')}>
                    Соусы
                </Tab>
                <Tab value="filling" active={tab === 'filling'} onClick={() => scrollToSection('filling')}>
                    Начинки
                </Tab>
            </div>

            <div className={styles.scrollContainer}>
                <div ref={bunRef} className={styles.category}>
                    <h3 className="text text_type_main-medium mb-6">Булки</h3>
                    <div className={styles.grid}>
                        {categorizedIngredients.bun?.map((ingredient) => (
                            <IngredientCardMini key={ingredient._id}  ingredient={ingredient} />
                        ))}
                    </div>
                </div>
                <div ref={sauceRef} className={styles.category}>
                    <h3 className="text text_type_main-medium mb-6">Соусы</h3>
                    <div className={styles.grid}>
                        {categorizedIngredients.sauce?.map((ingredient) => (
                            <IngredientCardMini key={ingredient._id} ingredient={ingredient} />
                        ))}
                    </div>
                </div>
                <div ref={fillingRef} className={styles.category}>
                    <h3 className="text text_type_main-medium mb-6">Начинки</h3>
                    <div className={styles.grid}>
                        {categorizedIngredients.main?.map((ingredient) => (
                            <IngredientCardMini key={ingredient._id} ingredient={ingredient} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};