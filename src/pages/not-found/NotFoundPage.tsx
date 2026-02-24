import {Link} from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export const NotFoundPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={`${styles.title} text text_type_main-large`}>
                    404
                </h1>
                <p className={`${styles.subtitle} text text_type_main-medium mb-6`}>
                    Страница не найдена
                </p>
                <p className={`${styles.description} text text_type_main-default text_color_inactive mb-10`}>
                    К сожалению, запрашиваемая вами страница не существует.
                </p>
                <Link to="/" className={styles.homeLink}>
                    <span className="text text_type_main-default">Вернуться на главную</span>
                </Link>
            </div>
        </div>
    );
}
