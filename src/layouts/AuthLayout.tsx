import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Box, Paper } from '@mui/material';

const AuthLayout = () => {
    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
                    <Outlet />
                </Paper>
            </Box>
        </Container>
    );
};

export default AuthLayout;