import styles from './ProfileForm.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {FormEvent, useEffect, useState} from "react";
import {selectUser, useAppDispatch, useAppSelector} from "../../services/RootReducer";
import {clearAuthError, updateUser} from "../../services/slices/UserSlice";

export const ProfileForm = () => {
    const dispatch = useAppDispatch();
    const { user, isUpdating, authError } = useAppSelector(selectUser);
    // не стал применять тут хук для полей контроля полей формы т.к. это его сильно усложнит. Вроде так понятнее...
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [editingFields, setEditingFields] = useState({
        name: false,
        email: false,
        password: false
    });

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const updateData: Partial<{ name: string; email: string; password: string }> = {};
        if (editingFields.name) {
            updateData.name = name;
        }
        if (editingFields.email) {
            updateData.email = email;
        }
        if (editingFields.password && password) {
            updateData.password = password;
        }
        dispatch(updateUser(updateData)).unwrap().then(() => {
            setEditingFields({ name: false, email: false, password: false });
            setPassword('');
        }).catch(() => {});
    };

    const handleEditField = (fieldName: 'name' | 'email' | 'password') => {
        setEditingFields(prev => ({
            ...prev,
            [fieldName]: true
        }));
    };

    const handleCancel = () => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
        setPassword('');
        setEditingFields({ name: false, email: false, password: false });
        dispatch(clearAuthError());
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <Input
                type="text"
                placeholder="Имя"
                name="name"
                icon='EditIcon'
                value={name}
                error={false}
                errorText="Ошибка"
                size="default"
                extraClass="mb-6"
                disabled={!editingFields.name}
                onChange={(e) => setName(e.target.value)}
                onIconClick={() => handleEditField('name')}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            />
            <Input
                type="email"
                placeholder="Логин"
                name="email"
                icon='EditIcon'
                value={email}
                error={false}
                errorText="Ошибка"
                size="default"
                extraClass="mb-6"
                disabled={!editingFields.email}
                onChange={(e) => setEmail(e.target.value)}
                onIconClick={() => handleEditField('email')}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            />
            <Input
                type="password"
                placeholder="Пароль"
                name="password"
                icon={!editingFields.password ? 'EditIcon' : 'CheckMarkIcon'}
                value={password}
                error={false}
                errorText="Ошибка"
                size="default"
                extraClass="mb-6"
                disabled={!editingFields.password}
                onChange={(e) => setPassword(e.target.value)}
                onIconClick={() => handleEditField('password')}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            />
            {(editingFields.name || editingFields.email || editingFields.password) && (
                <div className={styles.buttonGroup}>
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        extraClass="mr-2"
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'Сохранение...' : 'Сохранить'}
                    </Button>
                    <Button
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        onClick={handleCancel}
                    >
                        Отмена
                    </Button>
                </div>
            )}
            {authError && (
                <p className="text text_type_main-small text_color_error mb-4">{authError}</p>
            )}
        </form>
    );
}
