import styles from './AppHeader.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";

export const AppHeader = () => {

    return (
        <header className={`${styles.header} text text_type_main-default`}>
            <nav className={styles.nav}>
                <div className={styles.leftSection}>
                    <NavLink to="/" className={({ isActive }) => `${isActive ? '' : 'text_color_inactive'} pl-5 pr-5 pb-4 pt-4`}>
                        {({ isActive }) => (
                            <>
                                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                                <span className="ml-2 text">Конструктор</span>
                            </>
                        )}
                    </NavLink>
                    <NavLink to="/orders" className={({ isActive }) => `${isActive ? '' : 'text_color_inactive'} pl-5 pr-5 pb-4 pt-4 ml-2`}>
                        {({ isActive }) => (
                            <>
                                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                                <span className="ml-2 text">Лента заказов</span>
                            </>
                        )}
                    </NavLink>
                </div>
                <div className={styles.centerSection}>
                    <NavLink to="/" >
                        <Logo />
                    </NavLink>
                </div>
                <div className={styles.rightSection}>
                    <NavLink to="/profile" className={({ isActive }) => `${isActive ? '' : 'text_color_inactive'} pl-5 pr-5 pb-4 pt-4 ml-2`}>
                        {({ isActive }) => (
                            <>
                                <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                                <span className="ml-2 text">Личный кабинет</span>
                            </>
                        )}
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}
