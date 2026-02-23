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
        <div className={styles.profileContainer}>
            <div className={`${styles.sidebar} mr-15`}>
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
                    В этом разделе вы можете<br/>изменить свои персональные данные
                </p>
            </div>
            <div className={styles.content}>
                <Outlet />
            </div>
            <div className={styles.spacer}></div>
        </div>
    );
}
