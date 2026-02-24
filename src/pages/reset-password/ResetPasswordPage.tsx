import styles from '../login/LoginPage.module.css';
import {Link, useNavigate} from 'react-router-dom';
import {Input, Button, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {resetPassword} from "../../utils/UserApi";
import {useForm} from "../../hooks/useForm";
import {FormEvent} from "react";

export const ResetPasswordPage = () => {
    const { values, handleChange } = useForm({ password: '', token: '' });
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        resetPassword(values).then(() => {
                navigate('/login');
            }).catch(() => {});
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
                <PasswordInput
                    name={'password'}
                    value={values.password}
                    placeholder="Введите новый пароль"
                    onChange={handleChange}
                    extraClass="mb-6"
                />
                <Input
                    name={'token'}
                    type="text"
                    placeholder="Введите код из письма"
                    value={values.token}
                    onChange={handleChange}
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
                    disabled={!values.password || !values.token}
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
