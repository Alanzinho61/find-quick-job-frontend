import React from 'react';
import { Typography, Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';


const DashboardPage = () => {
    const user = useAuthStore((state) => state.user);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Welcome to FindQuickJob 👋
            </Typography>

            {user && (
                <Typography variant="h6" gutterBottom>
                    Logged in as: {user.fullName} ({user.email})
                </Typography>
            )}

            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/dashboard">
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/jobs">
                        <ListItemText primary="Add Job Post" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/applications">
                        <ListItemText primary="My Applications" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/profile">
                        <ListItemText primary="Profile" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
};

export default DashboardPage;
