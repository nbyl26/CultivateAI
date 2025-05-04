import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Farmers from '../assets/images/farmers.png';
import Logo from '../assets/images/logo.png';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Tautan reset password telah dikirim ke email Anda.');
        } catch (err) {
            setError('Gagal mengirim tautan reset password. Periksa email Anda.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f3fef5]">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl flex overflow-hidden"
            >
                {/* Left Section - Form */}
                <div className="w-1/2 p-10 flex flex-col justify-center">
                    <div className="mb-6">
                        <img src={Logo} alt="CultivateAI Logo" className="h-10 mb-4" />
                        <h1 className="text-3xl font-bold text-green-700">Lupa Password</h1>
                        <p className="text-sm text-gray-500">Masukkan email untuk menerima tautan reset password.</p>
                    </div>

                    {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
                    {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <div>
                            <label className="block text-sm mb-1 text-gray-600">Email</label>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition font-medium"
                        >
                            Kirim Tautan Reset
                        </button>
                    </form>

                    <div className="mt-6 text-sm text-center">
                        Kembali ke{' '}
                        <Link to="/login" className="text-green-700 hover:underline font-medium">
                            Login
                        </Link>
                    </div>
                </div>

                {/* Right Section - Illustration */}
                <div className="w-1/2 bg-green-600 text-white flex flex-col items-center justify-center relative p-8">
                    <img
                        src={Farmers}
                        alt="Petani Ilustrasi"
                        className="w-3/4 mb-4 max-w-sm drop-shadow-xl"
                    />
                    <h2 className="text-xl font-bold">Lupa password bukan akhir segalanya</h2>
                    <p className="text-sm mt-2 text-center max-w-xs">
                        Kami akan bantu Anda kembali masuk ke CultivateAI dan terus berkembang bersama komunitas.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
