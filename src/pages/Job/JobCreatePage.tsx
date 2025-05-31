import React, { useState } from 'react';
import axiosInstance from '../../api/axiousInstance';
import { useNavigate } from 'react-router-dom';
import { JobTypeLabels, WorkType } from '../../constants/enum';

const JobCreatePage = () => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        workType: '',
        jobType: '',
    });


    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // const createdByUserId = localStorage.getItem('token'); //token degil id olacak duzelt burayi...

        // if (!createdByUserId) {
        //     alert('Kullanıcı bilgisi alınamadı. Lütfen tekrar giriş yapın.');
        //     return;
        // }
        const createdByUserId = "51c0de63-55c0-4ec7-8ea6-fe5f53984e0c"
        try {
            const payload = {
                title: form.title,
                description: form.description,
                price: parseFloat(form.price),
                location: form.location,
                workType: Number(form.workType),
                jopType: Number(form.jobType), // dikkat: jopType backend'de bu şekilde
                createdByUserId,
            };

            await axiosInstance.post('/jobPosts', payload);

            alert('İş başarıyla oluşturuldu!');
            navigate('/jobs');
        } catch (err) {
            alert('Hata oluştu!');
            console.error(err);
        }
    };

    return (
        <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
            <h2>Yeni İş İlanı Oluştur</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    placeholder="İş Başlığı"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
                <br /><br />
                <textarea
                    name="description"
                    placeholder="Açıklama"
                    value={form.description}
                    onChange={handleChange}
                    required
                />
                <br /><br />
                <input
                    name="price"
                    placeholder="Ücret"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    required
                />
                <br /><br />
                <input
                    name="location"
                    placeholder="Konum"
                    value={form.location}
                    onChange={handleChange}
                />
                <br /><br />

                <label>Çalışma Türü:</label>
                <select name="workType" value={form.workType} onChange={handleChange} required>
                    <option value="">Seçiniz</option>
                    {Object.entries(WorkType).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>
                <br /><br />

                <label>İş Türü:</label>
                <select name="jobType" value={form.jobType} onChange={handleChange} required>
                    <option value="">Seçiniz</option>
                    {Object.entries(JobTypeLabels).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>
                <br /><br />

                <button type="submit">İlanı Oluştur</button>
            </form>
        </div>
    );
};

export default JobCreatePage;
