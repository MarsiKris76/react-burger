import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useMemo, useRef, useState, useEffect} from "react";
import styles from './BurgerIngredients.module.css';
import {Ingredient, IngredientType} from "../../types/ComponentTypes";
import {IngredientCard} from "../ingredient-card/IngredientCard";
import {selectIngredients, useAppDispatch, useAppSelector} from "../../services/RootReducer";
import {setCurrentIngredient} from "../../services/slices/ViewIngredientSlice";
import {useLocation, useNavigate} from "react-router-dom";

const sectionHeaderClassName = "text text_type_main-medium mb-6 mt-10";

export const BurgerIngredients = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { items: ingredients } = useAppSelector(selectIngredients);
    const [currentTab, setCurrentTab] = useState<IngredientType>('bun')
    const bunRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observerOptions: IntersectionObserverInit = {
            root: containerRef.current,
            rootMargin: '-20% 0px -80% 0px',
            threshold: 0
        };
        const observerCallback: IntersectionObserverCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    if (id === 'buns-section') {
                        setCurrentTab('bun');
                    } else if (id === 'sauces-section') {
                        setCurrentTab('sauce');
                    } else if (id === 'main-section') {
                        setCurrentTab('main');
                    }
                }
            });
        };
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        if (bunRef.current) observer.observe(bunRef.current);
        if (sauceRef.current) observer.observe(sauceRef.current);
        if (mainRef.current) observer.observe(mainRef.current);
        setCurrentTab('bun');
        return () => {
            observer.disconnect();
        };
    }, []);

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
        dispatch(setCurrentIngredient(ingredient));
        navigate(`/ingredients/${ingredient._id}`, { state: { backgroundLocation: location } });
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

            <div ref={containerRef} className={styles.scrollContainer}>
                <div ref={bunRef} id="buns-section">
                    <h3 className={sectionHeaderClassName}>Булки</h3>
                    <div className={styles.grid}>
                        {categorizedIngredients.bun?.map((ingredient) => (
                            <IngredientCard key={ingredient._id}  ingredient={ingredient} onClick={handleOpenDetailsModal}/>
                        ))}
                    </div>
                </div>
                <div ref={sauceRef} id="sauces-section">
                    <h3 className={sectionHeaderClassName}>Соусы</h3>
                    <div className={styles.grid}>
                        {categorizedIngredients.sauce?.map((ingredient) => (
                            <IngredientCard
                                key={ingredient._id}
                                ingredient={ingredient}
                                onClick={handleOpenDetailsModal}
                            />
                        ))}
                    </div>
                </div>
                <div ref={mainRef} id="main-section">
                    <h3 className={sectionHeaderClassName}>Начинки</h3>
                    <div className={styles.grid}>
                        {categorizedIngredients.main?.map((ingredient) => (
                            <IngredientCard key={ingredient._id} ingredient={ingredient} onClick={handleOpenDetailsModal}/>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
