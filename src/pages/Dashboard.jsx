import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

import { motion } from 'framer-motion';
import { LogOut, Leaf, MessageSquareText, BarChart2, Info } from 'lucide-react';

import ChatBot from '../components/ChatBot';

export default function Dashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                navigate('/login');
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribe(); // Clean up the listener
    }, [navigate]);

    const handleLogout = () => {
        auth.signOut();
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-green-700 font-semibold text-lg">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex flex-1">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-white shadow-md p-6 space-y-4">
                <button
                    onClick={() => navigate('/recommendation')}
                    className="flex items-center gap-2 text-gray-700 hover:text-green-700 font-medium"
                >
                    <Leaf className="w-5 h-5" /> Crop Recommendations
                </button>
                <button
                    onClick={() => navigate('/forum')}
                    className="flex items-center gap-2 text-gray-700 hover:text-green-700 font-medium"
                >
                    <MessageSquareText className="w-5 h-5" /> Farmer's Forum
                </button>
                <button
                    onClick={() => navigate('/monitoring')}
                    className="flex items-center gap-2 text-gray-700 hover:text-green-700 font-medium"
                >
                    <BarChart2 className="w-5 h-5" /> Plant Monitoring
                </button>
                <button
                    onClick={() => navigate('/about')}
                    className="flex items-center gap-2 text-gray-700 hover:text-green-700 font-medium"
                >
                    <Info className="w-5 h-5" /> About App
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
                        Welcome to <span className="text-green-700">CultivateAI</span> 👩‍🌾
                    </h1>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-green-500">
                            <p className="text-sm text-gray-500">Recommended Crop</p>
                            <h2 className="text-xl font-bold text-green-700">12</h2>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-purple-500">
                            <p className="text-sm text-gray-500">Forum Posts</p>
                            <h2 className="text-xl font-bold text-purple-700">34</h2>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-yellow-500">
                            <p className="text-sm text-gray-500">Monitoring Report</p>
                            <h2 className="text-xl font-bold text-yellow-700">5</h2>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-gray-500">
                            <p className="text-sm text-gray-500">Active Users</p>
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
                    <ChatBot />
                </motion.div>
            </main>
        </div>
    );
}
