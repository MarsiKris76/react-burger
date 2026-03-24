import styles from './ProfilePage.module.css';
import {Outlet, Link, useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../services/RootReducer';
import {logoutUser} from '../../services/slices/UserSlice';
import {useIsActive} from '../../hooks/useIsActive';

export const ProfilePage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isProfileActive = useIsActive('/profile');
    const isOrdersActive = useIsActive('/profile/orders');

    const handleLogout = () => {
        dispatch(logoutUser()).unwrap().then(() => {
            navigate('/login');
        }).catch(()=>{});
    };

    return (
        <div className={`pt-25 ${styles.profileContainer}`}>
            <aside className={styles.sidebar}>
                <nav>
                    <ul className={`${styles.menuList} text text_type_main-medium`}>
                        <li>
                            <Link to="/profile" className={`${styles.menuLink} ${isProfileActive ? styles.active : ''}`}>
                                Профиль
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile/orders" className={`${styles.menuLink} ${isOrdersActive ? styles.active : ''}`}>
                                История заказов
                            </Link>
                        </li>
                        <li>
                            <button onClick={handleLogout} className={`${styles.logoutButton} text text_type_main-medium`} >
                                Выход
                            </button>
                        </li>
                    </ul>
                </nav>
                <p className={'text text_type_main-default text_color_inactive mt-20'}>
                    {isProfileActive ? "В этом разделе вы можете изменить свои персональные данные"
                        : "В этом разделе вы можете посмотреть свою историю заказов"}
                </p>
            </aside>
            <main className={styles.content}>
                <Outlet />
            </main>
        </div>
    );
}
