import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

const PLANT_RECOMMENDATIONS = {
    hujan: ['Padi', 'Bayam', 'Sawi', 'Kangkung'],
    kemarau: ['Jagung', 'Kacang Tanah', 'Singkong'],
    transisi: ['Cabai', 'Tomat', 'Terong'],
};

export default function Recommendation() {
    const [location, setLocation] = useState('');
    const [season, setSeason] = useState('');
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const currentMonth = new Date().getMonth() + 1;
        let currentSeason = '';
        if (currentMonth >= 1 && currentMonth <= 3) currentSeason = 'hujan';
        else if (currentMonth >= 4 && currentMonth <= 9) currentSeason = 'kemarau';
        else currentSeason = 'transisi';

        setSeason(currentSeason);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!location) return alert('Mohon isi lokasi Anda');

        const plants = PLANT_RECOMMENDATIONS[season];
        setRecommendations(plants);
    };

    return (
        <Layout>
            <div className="min-h-screen bg-green-50 flex flex-col items-center p-8">
                <h1 className="text-3xl font-bold mb-4">Rekomendasi Tanaman</h1>
                <p className="mb-4">Musim saat ini: <strong>{season.toUpperCase()}</strong></p>
                <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
                    <input
                        type="text"
                        placeholder="Masukkan lokasi (contoh: Yogyakarta)"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="p-2 border rounded w-80"
                    />
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                        Lihat Rekomendasi
                    </button>
                </form>

                {recommendations.length > 0 && (
                    <div className="bg-white rounded shadow p-4 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-2">Tanaman yang cocok di {location}</h2>
                        <ul className="list-disc pl-5">
                            {recommendations.map((plant, i) => (
                                <li key={i}>{plant}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </Layout>
    );
}
