import styles from '../login/LoginPage.module.css';
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Input, Button, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {resetPassword} from "../../utils/UserApi";

export const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        resetPassword({ password, token }).then(() => {
                navigate('/login');
            }).catch(() => {});
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
                <PasswordInput
                    value={password}
                    placeholder="Введите новый пароль"
                    onChange={(e) => setPassword(e.target.value)}
                    extraClass="mb-6"
                />
                <Input
                    type="text"
                    placeholder="Введите код из письма"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    error={false}
                    errorText="Ошибка"
                    size="default"
                    extraClass="mb-6"
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                />

                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    disabled={!password || !token}
                >
                    Сохранить
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
