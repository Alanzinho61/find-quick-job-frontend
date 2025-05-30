import axios from '../../../src/api/axiousInstance';
import { JobTypeLabels } from '../../constants/enum';
import { WorkType } from '../../constants/enum';
import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Chip,
    Divider
} from '@mui/material';

interface JobPost {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    workType: string;
    jopType: string;
    createdAt: string;
}

const JobListPage = () => {
    const [jobs, setJobs] = useState<JobPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('/jobposts');
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching job posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) {
        return <Typography>Yükleniyor...</Typography>;
    }

    return (
        <Box sx={{ maxWidth: '700px', margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                İş İlanları
            </Typography>

            {jobs.map((job) => (
                <Card key={job.id} variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ mb: 1 }}>{job.title}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {job.description}
                        </Typography>
                        <Typography>💰 Ücret: {job.price} ₺</Typography>
                        <Typography>📍 Konum: {job.location}</Typography>

                        <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Chip label={WorkType[parseInt(job.workType)]} color="primary" size="small" />
                            <Chip label={JobTypeLabels[parseInt(job.jopType)] || 'Unknown'} color="secondary" size="small" />
                        </Box>

                        <Divider sx={{ my: 1 }} />

                        <Typography variant="caption">
                            Yayınlanma Tarihi: {new Date(job.createdAt).toLocaleDateString()}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default JobListPage;
