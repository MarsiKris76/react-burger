import {FC} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {selectUser, useAppDispatch, useAppSelector} from "../../services/RootReducer";
import {ProtectedRouteProps} from "../../types/ComponentTypes";
import {logout} from "../../services/slices/UserSlice";

export const ProtectedRoute: FC<ProtectedRouteProps> = ({children, onlyUnAuth = false}) => {
    const { user, isAuthChecked, authError } = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const location = useLocation();

    if (authError) {
        dispatch(logout());
        return <Navigate to="/login" state={{ from: location }} />;
    }

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
