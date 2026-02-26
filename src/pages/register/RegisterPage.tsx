import styles from '../login/LoginPage.module.css';
import {Link, useNavigate} from 'react-router-dom';
import {Input, Button, PasswordInput, EmailInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {useAppDispatch} from "../../services/RootReducer";
import {registerUser} from "../../services/slices/UserSlice";
import {useForm} from "../../hooks/useForm";
import {FormEvent} from "react";

export const RegisterPage = () => {
    const { values, handleChange } = useForm({ name: '', email: '', password: '' });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(registerUser(values)).then(() => {
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
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={false}
                    errorText="Ошибка"
                    size="default"
                    extraClass="mb-6"
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                />
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
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    extraClass="mb-6"
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    disabled={!values.name || !values.email || !values.password}
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
