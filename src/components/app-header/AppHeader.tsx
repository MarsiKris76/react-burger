import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './AppHeader.module.css';

export const AppHeader = () => {
    return (
        <header className={styles.header + " text text_type_main-default"}>
            <nav className={styles.nav}>
                <div className={styles.leftSection}>
                    <div className="pl-5 pr-5 pb-4 pt-4">
                        <BurgerIcon type="primary"/>
                        <span className="ml-2">Конструктор</span>
                    </div>

                    <div className="text_color_inactive pl-5 pr-5 pb-4 pt-4 ml-2">
                        <ListIcon type="secondary"/>
                        <span className="ml-2">Лента заказов</span>
                    </div>
                </div>
                <div className={styles.centerSection}>
                    <Logo />
                </div>
                <div className={styles.rightSection + " text_color_inactive pl-5 pr-5 pb-4 pt-4 ml-2"}>
                    <ProfileIcon type="secondary" />
                    <span>Личный кабинет</span>
                </div>
            </nav>
        </header>
    );
};