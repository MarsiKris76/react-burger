import styles from '../login/LoginPage.module.css';
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button, EmailInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {forgotPassword} from "../../utils/UserApi";

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        forgotPassword({email}).then(() => {
            navigate('/reset-password');
        }).catch(() => {});
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
                <EmailInput
                    placeholder="Укажите E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    errorText="Ошибка"
                    size="default"
                    extraClass="mb-6"
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    disabled={!email}
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
