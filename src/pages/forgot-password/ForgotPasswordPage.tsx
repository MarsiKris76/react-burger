import styles from '../login/LoginPage.module.css';
import {Link, useNavigate} from 'react-router-dom';
import {Button, EmailInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {useForm} from "../../hooks/useForm";
import {FormEvent} from "react";
import {forgotPassword, userSelectors} from "../../services/slices/UserSlice";
import {useAppDispatch, useAppSelector} from "../../services/RootReducer";

export const ForgotPasswordPage = () => {
    const { values, handleChange } = useForm({email: ''});
    const { authError } = useAppSelector(userSelectors.selectUserData);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(forgotPassword(values)).unwrap().then(() => {
            navigate('/reset-password');
        }).catch(() => {});
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
                <EmailInput
                    placeholder="Укажите E-mail"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    errorText="Ошибка"
                    size="default"
                    extraClass="mb-6"
                />
                {authError ? (
                    <span className="text text_type_main-small text_color_error mb-6">{authError}</span>) : null}
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    disabled={!values.email}
                >
                    Восстановить
                </Button>
            </form>

            <div className={`${styles.footer} mt-20`}>
                <p className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль?&nbsp;
                    <Link to="/login" className={styles.link}>
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    );
}
