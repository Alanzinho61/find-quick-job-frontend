import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import JobListPage from '../pages/job/JobListPage';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

const AppRoutes = () => (
    <Routes>
        <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<MainLayout />}>
            <Route path="/" element={<JobListPage />} />
            {/* Diğer korumalı rotalar */}
        </Route>
    </Routes>
);

export default AppRoutes;