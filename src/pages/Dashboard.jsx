import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

import { motion } from 'framer-motion';
import { LogOut, Leaf, MessageSquareText, BarChart2, Info } from 'lucide-react';

import Button from '../components/Button';
import GeminiChat from '../components/GeminiChat';

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) navigate('/login');
    }, []);

    const handleLogout = () => {
        auth.signOut();
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
                <div className="text-xl font-bold text-green-700">🌱 CultivateAI</div>
                <div className="flex items-center gap-4">
                    <img
                        src="https://ui-avatars.com/api/?name=User"
                        alt="Avatar"
                        className="w-9 h-9 rounded-full border"
                    />
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>
            </header>

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="hidden md:flex flex-col w-64 bg-white shadow-md p-6 space-y-4">
                    <button
                        onClick={() => navigate('/recommendation')}
                        className="flex items-center gap-2 text-gray-700 hover:text-green-700 font-medium"
                    >
                        <Leaf className="w-5 h-5" /> Rekomendasi Tanaman
                    </button>
                    <button
                        onClick={() => navigate('/forum')}
                        className="flex items-center gap-2 text-gray-700 hover:text-green-700 font-medium"
                    >
                        <MessageSquareText className="w-5 h-5" /> Forum Petani
                    </button>
                    <button
                        onClick={() => navigate('/monitoring')}
                        className="flex items-center gap-2 text-gray-700 hover:text-green-700 font-medium"
                    >
                        <BarChart2 className="w-5 h-5" /> Monitoring Tanaman
                    </button>
                    <button
                        onClick={() => navigate('/about')}
                        className="flex items-center gap-2 text-gray-700 hover:text-green-700 font-medium"
                    >
                        <Info className="w-5 h-5" /> Tentang Aplikasi
                    </button>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                            Selamat datang di <span className="text-green-700">CultivateAI</span> 👩‍🌾
                        </h1>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white p-4 rounded-xl shadow border-l-4 border-green-500">
                                <p className="text-sm text-gray-500">Tanaman direkomendasikan</p>
                                <h2 className="text-xl font-bold text-green-700">12</h2>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow border-l-4 border-purple-500">
                                <p className="text-sm text-gray-500">Postingan forum</p>
                                <h2 className="text-xl font-bold text-purple-700">34</h2>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow border-l-4 border-yellow-500">
                                <p className="text-sm text-gray-500">Laporan monitoring</p>
                                <h2 className="text-xl font-bold text-yellow-700">5</h2>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow border-l-4 border-gray-500">
                                <p className="text-sm text-gray-500">Pengguna aktif</p>
                                <h2 className="text-xl font-bold text-gray-700">21</h2>
                            </div>
                        </div>
                    </motion.div>

                    {/* Chatbot Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        <GeminiChat />
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
