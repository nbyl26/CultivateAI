import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

import Layout from '../components/Layout';
import GeminiChat from '../components/GeminiChat';
import Button from '../components/Button';

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) {
            navigate('/login');
        }
    }, []);

    const handleLogout = () => {
        auth.signOut();
        navigate('/login');
    };

    return (
        <Layout>
            <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">
                Selamat datang di <span className="text-green-900">CultivateAI</span> 👩‍🌾
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md mx-auto mb-10">
                <Button onClick={() => navigate('/recommendation')} color="bg-blue-600">
                    🌿 Rekomendasi Tanaman
                </Button>
                <Button onClick={() => navigate('/forum')} color="bg-purple-600">
                    💬 Forum Petani
                </Button>
                <Button onClick={() => navigate('/monitoring')} color="bg-yellow-500">
                    📊 Monitoring Tanaman
                </Button>
                <Button onClick={() => navigate('/about')} color="bg-gray-700">
                    ℹ️ Tentang Aplikasi
                </Button>
            </div>

            <GeminiChat />

            <div className="mt-10 text-center">
                <Button onClick={handleLogout} color="bg-red-500">
                    Keluar
                </Button>
            </div>
        </Layout>
    );
}
