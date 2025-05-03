import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import GeminiChat from '../components/GeminiChat';


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

                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                    Logout
                </button>
            </div>
        </div>
    );
}
