import { useState, useEffect } from 'react';
import Button from '../components/Button';

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
        if (!location.trim()) return alert('Mohon isi lokasi Anda');

        const plants = PLANT_RECOMMENDATIONS[season] || [];
        setRecommendations(plants);
    };

    return (
        <div className="max-w-xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl font-bold text-green-800 mb-2">🌾 Rekomendasi Tanaman</h1>
            <p className="text-gray-600 mb-6">
                Berdasarkan musim saat ini: <span className="font-semibold text-green-700">{season.toUpperCase()}</span>
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mb-6">
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Masukkan lokasi (contoh: Yogyakarta)"
                    className="w-full max-w-md border border-green-300 p-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />
                <Button type="submit" color="bg-green-600">
                    🔍 Lihat Rekomendasi
                </Button>
            </form>

            {recommendations.length > 0 && (
                <div className="bg-white border border-green-100 rounded-lg p-6 shadow transition hover:shadow-md">
                    <h2 className="text-2xl font-semibold text-green-700 mb-3">
                        Tanaman yang cocok di <span className="capitalize">{location}</span>
                    </h2>
                    <ul className="list-disc text-left pl-6 space-y-1 text-gray-800">
                        {recommendations.map((plant, idx) => (
                            <li key={idx} className="transition-transform hover:translate-x-1">{plant}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
