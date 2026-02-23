import styles from './ProfileForm.module.css';
import {EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../services/RootReducer";
import {updateUser} from "../../services/slices/UserSlice";

export const ProfileForm = () => {
    const dispatch = useAppDispatch();
    const { user, isUpdating, authError } = useAppSelector(state => state.user);
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(1)
        dispatch(updateUser({ name, email, password })).unwrap().then(() => {
            setEditingFields({ name: false, email: false, password: false });
            setPassword(''); // очищаем пароль после успешного обновления
        }).catch(() => {});
      };
    const handleEditField = (fieldName: 'name' | 'email' | 'password') => {
        setEditingFields(prev => ({
            ...prev,
            [fieldName]: true
        }));
    };

    const handleBlur = (fieldName: 'name' | 'email' | 'password', value: string) => {
        setEditingFields(prev => ({
            ...prev,
            [fieldName]: false
        }));
    };

    if (!user) {
        return <p>Загрузка...</p>; // или спиннер загрузки
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <Input
                type="text"
                placeholder="Имя"
                icon='EditIcon'
                value={name}
                error={false}
                errorText="Ошибка"
                size="default"
                extraClass="mb-6"
                disabled={!editingFields.name}
                onChange={(e) => setName(e.target.value)}
                onIconClick={() => handleEditField('name')}
                onBlur={() => handleBlur('name', name)}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            />
            <Input
                type="email"
                placeholder="Логин"
                icon='EditIcon'
                value={email}
                error={false}
                errorText="Ошибка"
                size="default"
                extraClass="mb-6"
                disabled={!editingFields.email}
                onChange={(e) => setEmail(e.target.value)}
                onIconClick={() => handleEditField('email')}
                onBlur={() => handleBlur('email', email)}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            />
            <Input
                type="password"
                placeholder="Пароль"
                icon='EditIcon'
                value={password}
                error={false}
                errorText="Ошибка"
                size="default"
                extraClass="mb-6"
                disabled={!editingFields.password}
                onChange={(e) => setPassword(e.target.value)}
                onIconClick={() => handleEditField('password')}
                onBlur={() => handleBlur('password', password)}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            />
            <button className={styles.form2} type="submit"></button>

{
//                 <EmailInput
//                     placeholder="Логин"
//                     value={email}
//                     isIcon={true}
//                     onChange={(e) => setEmail(e.target.value)}
//                     errorText="Ошибка"
//                     size="default"
//                     extraClass="mb-6"
//                     disabled={!isEditing}
//                 />
//                 <PasswordInput
//                     placeholder="Пароль"
//                     value={password}
//                     icon='EditIcon'
//                     onChange={(e) => setPassword(e.target.value)}
//                     errorText="Ошибка"
//                     size="default"
//                     disabled={!isEditing}
//                 />
}
            {authError && (
                <p className="text text_type_main-small text_color_error mb-4">{authError}</p>
            )}
        </form>
    );
}
