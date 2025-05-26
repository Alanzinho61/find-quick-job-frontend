import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface RouteGuardProps {
    children: React.ReactNode;
}

const RouteGuard = ({ children }: RouteGuardProps) => {
    const token = useAuthStore((state) => state.token);

    if (!token) {
        return <Navigate to="/auth/login" replace />;
    }

    return <>{children}</>;
};

export default RouteGuard;