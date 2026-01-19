import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useMemo, useRef, useState} from "react";
import styles from './BurgerIngredients.module.css';
import {BurgerIngredientsProps, Ingredient, IngredientType} from "../../types/Types";
import {Modal} from "../modal/Modal";
import {IngredientDetails} from "../ingredient-details/IngredientDetails";
import {IngredientCard} from "../ingredient-card/IngredientCard";

const sectionHeaderClassName = "text text_type_main-medium mb-6 mt-10";

export const BurgerIngredients = ({ ingredients } : BurgerIngredientsProps) => {
    const [currentTab, setCurrentTab] = useState<IngredientType>('bun')
    const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const bunRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    const categorizedIngredients = useMemo(() => {
        return ingredients.reduce((acc, ingredient: Ingredient) => {
            if (!acc[ingredient.type]) {
                acc[ingredient.type] = [];
            }
            acc[ingredient.type].push(ingredient);
            return acc;
        }, {} as Record<string, Ingredient[]>);
    }, [ingredients]);

    const scrollToSection = (section: IngredientType) => {
        setCurrentTab(section);
        const refs = { bun: bunRef, sauce: sauceRef, main: mainRef };
        refs[section]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleOpenDetailsModal = (ingredient: Ingredient) => {
        setSelectedIngredient(ingredient);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedIngredient(null);
    };

    return (
        <section className={`${styles.section} + mr-10`}>
            <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
            <div className={styles.tabs}>
                <Tab value="bun" active={currentTab === 'bun'} onClick={() => scrollToSection('bun')}>
                    Булки
                </Tab>
                <Tab value="sauce" active={currentTab === 'sauce'} onClick={() => scrollToSection('sauce')}>
                    Соусы
                </Tab>
                <Tab value="main" active={currentTab === 'main'} onClick={() => scrollToSection('main')}>
                    Начинки
                </Tab>
            </div>

            <div className={styles.scrollContainer}>
                <div ref={bunRef}>
                    <h3 className={sectionHeaderClassName}>Булки</h3>
                    <div className={styles.grid}>
                        {categorizedIngredients.bun?.map((ingredient) => (
                            <IngredientCard key={ingredient._id}  ingredient={ingredient} onClick={handleOpenDetailsModal}/>
                        ))}
                    </div>
                </div>
                <div ref={sauceRef}>
                    <h3 className={sectionHeaderClassName}>Соусы</h3>
                    <div className={styles.grid}>
                        {categorizedIngredients.sauce?.map((ingredient) => (
                            <IngredientCard key={ingredient._id} ingredient={ingredient} onClick={handleOpenDetailsModal}/>
                        ))}
                    </div>
                </div>
                <div ref={mainRef}>
                    <h3 className={sectionHeaderClassName}>Начинки</h3>
                    <div className={styles.grid}>
                        {categorizedIngredients.main?.map((ingredient) => (
                            <IngredientCard key={ingredient._id} ingredient={ingredient} onClick={handleOpenDetailsModal}/>
                        ))}
                    </div>
                </div>
            </div>
            {isModalOpen && selectedIngredient && (
                <Modal title="Детали ингредиента" onClose={handleCloseModal}>
                    <IngredientDetails ingredient={selectedIngredient} />
                </Modal>
            )}
        </section>
    );
};