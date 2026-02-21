import styles from '../login/LoginPage.module.css';
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Input, Button, PasswordInput, EmailInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {useAppDispatch} from "../../services/RootReducer";
import {registerUser} from "../../services/slices/UserSlice";

export const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(registerUser({ name, email, password })).then(() => {
            navigate('/');
        });
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
                <Input
                    type="text"
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={false}
                    errorText="Ошибка"
                    size="default"
                    extraClass="mb-6"
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                />
                <EmailInput
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    errorText="Ошибка"
                    size="default"
                    extraClass="mb-6"
                />
                <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    extraClass="mb-6"
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    disabled={!name || !email || !password}
                >
                    Зарегистрироваться
                </Button>
            </form>
            <div className={`${styles.footer} mt-20`}>
                <p className="text text_type_main-default text_color_inactive">
                    Уже зарегистрированы?&nbsp;
                    <Link to="/login" className={styles.link}>
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    );
}
