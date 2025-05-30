import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import RouteGuard from './RouteGuard';
import DashboardPage from '../pages/DashboardPage';
import JobListPage from '../pages/Job/JobListPage';

const AppRoutes = () => {
    return (
        <Routes>
            {/* AUTH ROUTES */}
            <Route path="/auth" element={<AuthLayout />}>
                <Route index element={<Navigate to="login" />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
            </Route>

            {/* PROTECTED ROUTES */}
            <Route
                path="/"
                element={
                    <RouteGuard>
                        <MainLayout />
                    </RouteGuard>
                }
            >
                <Route index element={<DashboardPage />} />
                <Route path='jobs' element={<JobListPage />} />
            </Route>

            {/* 404 fallback */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;
