import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './AppHeader.module.css';
import React from "react";
import {NavLink, useLocation} from "react-router-dom";

export const AppHeader = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <header className={`${styles.header} text text_type_main-default`}>
            <nav className={styles.nav}>
                <div className={styles.leftSection}>
                    <NavLink to="/" className={`${isActive('/') ? '' : 'text_color_inactive'} pl-5 pr-5 pb-4 pt-4`}>
                        <BurgerIcon type={isActive('/') ? 'primary' : 'secondary'} />
                        <span className="ml-2 text">Конструктор</span>
                    </NavLink>
                    <div className="text_color_inactive pl-5 pr-5 pb-4 pt-4 ml-2">
                        <ListIcon type="secondary"/>
                        <span className="ml-2">Лента заказов</span>
                    </div>
                </div>
                <div className={styles.centerSection}>
                    <Logo />
                </div>
                <div className={styles.rightSection}>
                    <NavLink to="/profile" className={`${isActive('/profile') ? '' : 'text_color_inactive'} pl-5 pr-5 pb-4 pt-4 ml-2`}>
                        <ProfileIcon type={isActive('/profile') ? 'primary' : 'secondary'} />
                        <span className="ml-2 text">Личный кабинет</span>
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}
