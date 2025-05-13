import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiAlertTriangle } from 'react-icons/fi';
import { TbPlant } from 'react-icons/tb';

const PLANT_RECOMMENDATIONS = {
    hujan: ['Padi', 'Bayam', 'Sawi', 'Kangkung'],
    kemarau: ['Jagung', 'Kacang Tanah', 'Singkong'],
    transisi: ['Cabai', 'Tomat', 'Terong'],
};

export default function Recommendation() {
    const [location, setLocation] = useState('');
    const [season, setSeason] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

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
        if (!location.trim()) {
            setShowAlert(true);
            return;
        }
        setShowAlert(false);
        const plants = PLANT_RECOMMENDATIONS[season] || [];
        setRecommendations(plants);
    };

    return (
        <motion.div
            className="max-w-4xl mx-auto px-4 py-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-green-800">🌾 Rekomendasi Tanaman</h1>
                <p className="text-gray-600 mt-2">
                    Musim saat ini: <span className="font-semibold text-green-700 uppercase">{season}</span>
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4 justify-center mb-6">
                <div className="relative w-full max-w-md">
                    <FiMapPin className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Masukkan lokasi Anda (misal: Bandung)"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 transition text-white font-medium py-3 px-6 rounded-xl shadow"
                >
                    🔍 Lihat Rekomendasi
                </button>
            </form>

            {showAlert && (
                <motion.div
                    className="flex items-center justify-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-3 rounded-md max-w-md mx-auto mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <FiAlertTriangle className="text-xl" />
                    <span>Mohon isi lokasi terlebih dahulu.</span>
                </motion.div>
            )}

            {recommendations.length > 0 && (
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
                    }}
                >
                    {recommendations.map((plant, idx) => (
                        <motion.div
                            key={idx}
                            className="bg-white rounded-xl border border-green-100 shadow-md p-6 text-center hover:shadow-lg transition"
                            whileHover={{ scale: 1.03 }}
                        >
                            <div className="flex justify-center mb-3 text-green-600">
                                <TbPlant className="text-4xl" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">{plant}</h3>
                            <p className="text-sm text-gray-500 mt-1">Tanaman cocok untuk musim {season}</p>
                            <span className="inline-block mt-3 px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                                Musim {season}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {recommendations.length > 0 && (
                <motion.div
                    className="mt-10 max-w-2xl mx-auto text-center text-sm text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <p>🌦️ Tips: Pastikan tanaman dipilih sesuai kondisi tanah dan iklim mikro di daerah Anda.</p>
                    <p className="mt-1">📌 Catatan: Data berdasarkan musim nasional dan pola umum tanam di Indonesia.</p>
                </motion.div>
            )}
        </motion.div>
    );
}
