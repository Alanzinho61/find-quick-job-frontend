import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Divider,
    Chip
} from '@mui/material';
import axiosInstance from '../../api/axiousInstance';

interface Application {
    id: string;
    jobPostTitle: string;
    message: string;
    appliedAt: string;
    status: number;
}

const statusLabels: { [key: number]: string } = {
    0: 'Beklemede',
    1: 'Kabul Edildi',
    2: 'Reddedildi',
};

const statusColors: { [key: number]: 'default' | 'success' | 'error' } = {
    0: 'default',
    1: 'success',
    2: 'error',
};

const ApplicationListPage = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await axiosInstance.get('/applications');
                setApplications(res.data);
            } catch (err) {
                console.error('Başvurular alınamadı:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    return (
        <Box sx={{ maxWidth: '700px', margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Başvurularım
            </Typography>

            {loading ? (
                <Typography>Yükleniyor...</Typography>
            ) : applications.length === 0 ? (
                <Typography>Henüz başvuru yapmadınız.</Typography>
            ) : (
                applications.map((app) => (
                    <Card key={app.id} variant="outlined" sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6">{app.jobPostTitle}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                {app.message}
                            </Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                <Chip
                                    label={statusLabels[app.status] || 'Bilinmiyor'}
                                    color={statusColors[app.status] || 'default'}
                                    size="small"
                                />
                                <Chip
                                    label={`Başvuru Tarihi: ${new Date(app.appliedAt).toLocaleDateString()}`}
                                    variant="outlined"
                                    size="small"
                                />
                            </Box>
                        </CardContent>
                    </Card>
                ))
            )}
        </Box>
    );
};

export default ApplicationListPage;
