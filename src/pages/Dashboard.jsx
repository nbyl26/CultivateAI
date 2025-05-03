import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import GeminiChat from '../components/GeminiChat';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';


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
            <div className="min-h-screen flex items-center justify-center bg-green-50">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Selamat datang di CultivateAI!</h1>
                    <GeminiChat />
                    <button
                        onClick={() => navigate('/recommendation')}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Rekomendasi Tanaman
                    </button>
                    <button
                        onClick={() => navigate('/forum')}
                        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded"
                    >
                        Forum Petani
                    </button>
                    <button
                        onClick={() => navigate('/monitoring')}
                        className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded"
                    >
                        Monitoring Tanaman
                    </button>
                    <button
                        onClick={() => navigate('/about')}
                        className="mt-4 bg-gray-700 text-white px-4 py-2 rounded"
                    >
                        Tentang Aplikasi
                    </button>


                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                        Logout
                    </button>
                </div>
            </div>
        </Layout>
    );
}
