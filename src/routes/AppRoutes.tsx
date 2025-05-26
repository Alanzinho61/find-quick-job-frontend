import { Routes, Route, Router, Navigate } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import JobListPage from '../pages/job/JobListPage';
//import MainLayout from '../layouts/MainLayout';
//import AuthLayout from '../layouts/AuthLayout';
import RouteGuard from './RouteGuard';
import DashboardPage from '../layouts/DashboardPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/auth" element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route
                path="/"
                element={
                    <RouteGuard>
                        <MainLayout />
                    </RouteGuard>
                }>

                <Route index element={<DashboardPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>

    );
};

export default AppRoutes;