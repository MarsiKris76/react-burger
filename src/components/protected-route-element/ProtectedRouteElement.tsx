import {FC} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {selectUser, useAppSelector} from "../../services/RootReducer";
import {ProtectedRouteProps} from "../../types/ComponentTypes";

export const ProtectedRouteElement: FC<ProtectedRouteProps> = ({children, onlyUnAuth = false}) => {
    const { user, isAuthChecked } = useAppSelector(selectUser);
    const location = useLocation();

    if (!isAuthChecked) {
        return <p className="text text_type_main-medium">Загрузка...</p>;
    }
    if (onlyUnAuth) {
        if (user) {
            const from = location.state?.from || { pathname: '/' };
            return <Navigate to={from.pathname} />;
        }
        return <>{children}</>;
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return <>{children}</>;
};
