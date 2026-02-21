import {Route, Routes} from "react-router-dom";
import {useAppDispatch} from "../../services/RootReducer";
import {useEffect} from "react";
import {authCheck} from "../../services/slices/UserSlice";
import {ProtectedRoute} from "../protected-route/ProtectedRoute";
import {AppHeader} from "../app-header/AppHeader";
import {RegisterPage} from "../../pages/register/RegisterPage";
import {ForgotPasswordPage} from "../../pages/forgot-password/ForgotPasswordPage";
import {ResetPasswordPage} from "../../pages/reset-password/ResetPasswordPage";
import {NotFoundPage} from "../../pages/not-found/NotFoundPage";
import {LoginPage} from "../../pages/login/LoginPage";
import {MainPage} from "../../pages/main/MainPage";
import {IngredientDetailsPage} from "../../pages/ingredient-details/IngredientDetailsPage";
import {ProfilePage} from "../../pages/profile/ProfilePage";


export const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authCheck());
    }, [dispatch]);

    return (
        <>
            <AppHeader />
            <Routes>
                <Route path="/" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
                <Route path="/login" element={<ProtectedRoute onlyUnAuth={true}><LoginPage /></ProtectedRoute>} />
                <Route path="/register" element={<ProtectedRoute onlyUnAuth={true}><RegisterPage /></ProtectedRoute>} />
                <Route path="/forgot-password" element={<ProtectedRoute onlyUnAuth={true}><ForgotPasswordPage /></ProtectedRoute>} />
                <Route path="/reset-password" element={<ProtectedRoute onlyUnAuth={true}><ResetPasswordPage /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
}
