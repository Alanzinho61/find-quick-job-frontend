import axios from '../../api/axiousInstance';
import { JobTypeLabels, WorkType } from '../../constants/enum';
import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Chip,
    Divider,
    Button
} from '@mui/material';
import { useAuthStore } from '../../store/authStore';

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
    const user = useAuthStore((state) => state.user);

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

    const handleApply = async (jobId: string) => {
        try {
            const payload = {
                userId: user?.id,
                jobPostId: jobId,
                message: "Bu iş için başvurmak istiyorum!"
            };

            await axios.post('/applications', payload);
            alert("Başvurunuz başarıyla gönderildi.");
        } catch (error) {
            console.error('Başvuru sırasında hata oluştu:', error);
            alert('Başvuru başarısız oldu.');
        }
    };

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

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" color="text.secondary">
                                Yayınlanma: {new Date(job.createdAt).toLocaleDateString()}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                            <Button
                                variant="contained"
                                size="small"
                                sx={{
                                    backgroundColor: '#ffb6b9',
                                    color: '#fff',
                                    textTransform: 'none',
                                    borderRadius: '20px',
                                    px: 3,
                                    '&:hover': {
                                        backgroundColor: '#ff8a8a',
                                    },
                                }}
                                onClick={() => handleApply(job.id)}
                            >
                                ❤️ Başvur
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default JobListPage;
