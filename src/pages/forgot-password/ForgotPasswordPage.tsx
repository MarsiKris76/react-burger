import styles from '../login/LoginPage.module.css';
import {Link, useNavigate} from 'react-router-dom';
import {Button, EmailInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {forgotPassword} from "../../utils/UserApi";
import {useForm} from "../../hooks/useForm";
import {FormEvent} from "react";

export const ForgotPasswordPage = () => {
    const { values, handleChange } = useForm({email: ''});
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        forgotPassword(values).then(() => {
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
