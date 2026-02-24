import styles from './LoginPage.module.css';
import {FormEvent, useEffect} from "react";
import {selectUser, useAppDispatch, useAppSelector} from "../../services/RootReducer";
import {Link, useNavigate} from "react-router-dom";
import {Button, PasswordInput, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {clearAuthError, loginUser} from "../../services/slices/UserSlice";
import {useForm} from "../../hooks/useForm";


export const LoginPage = () => {
    const dispatch = useAppDispatch();
    const {isAuthChecked, authError, user} = useAppSelector(selectUser);
    const navigate = useNavigate();
    const { values, handleChange } = useForm({ email: '', password: '' });

    useEffect(() => {
        dispatch(clearAuthError());
    }, [dispatch])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(loginUser(values)).unwrap().then(() => {
            if (isAuthChecked && user) {
                navigate('/');
            }
        }).catch(() => {});
    };

    return (
        <div className={styles.container}>
            <h2 className="text text_type_main-medium mb-6">Вход</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                {/*
                    TODO: есть ошибка в ЯндексБраузере. Если данные логина и пароля сохранены, то при подстановке после
                    обновления страницы форма не чувствует изменений до первого действия пользователя на странице.
                    Т.к. теневой, дом Input'та закрыт не нашёл как получить эти данные.
                */}
                <EmailInput
                    placeholder="E-mail"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    errorText="Ошибка"
                    size="default"
                    extraClass="mb-6"
                />
                <PasswordInput
                    placeholder="Пароль"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    extraClass="mb-6"
                />
                {
                    //неправильно показывать ошибку с сервера "как есть", но это учебная ситуация
                    authError ? (<span className="text text_type_main-small text_color_error mb-6">{authError}</span>) : null
                }
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    disabled={!values.email || !values.password}
                >
                    Войти
                </Button>
            </form>
            <div className={`${styles.footer} mt-20`}>
                <p className="text text_type_main-default text_color_inactive">
                    Вы — новый пользователь?&nbsp;
                    <Link to="/register" className={styles.link}>
                        Зарегистрироваться
                    </Link>
                </p>
                <p className="text text_type_main-default text_color_inactive mt-4">
                    Забыли пароль?&nbsp;
                    <Link to="/forgot-password" className={styles.link}>
                        Восстановить пароль
                    </Link>
                </p>
            </div>
        </div>
    );
}
