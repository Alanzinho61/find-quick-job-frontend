import React from 'react';
import { Typography, Box } from '@mui/material';
import { useAuthStore } from '../store/authStore';

const DashboardPage = () => {
    const user = useAuthStore((state) => state.user);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Welcome to FindQuickJob 👋

            </Typography>
            {user && (
                <Typography variant="h6">
                    Logged in as: {user.name} ({user.email})
                </Typography>
            )}
        </Box>


    );
};

export default DashboardPage;
