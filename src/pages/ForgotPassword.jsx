import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({ success: null, message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ success: null, message: '' });

        try {
            await sendPasswordResetEmail(auth, email);
            setStatus({ success: true, message: 'Tautan reset password telah dikirim ke email Anda.' });
        } catch (error) {
            setStatus({ success: false, message: error.message || 'Gagal mengirim tautan reset.' });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-50 to-white px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 sm:p-10 border border-green-100"
            >
                {/* Logo */}
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-green-700">🌱 CultivateAI</h1>
                    <p className="text-sm text-gray-500 mt-1">Atur ulang kata sandi Anda</p>
                </div>

                {/* Notification */}
                {status.message && (
                    <div
                        className={`text-sm text-center mb-4 px-4 py-2 rounded-md ${status.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}
                    >
                        {status.message}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Alamat email kamu"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md transition"
                    >
                        Kirim Tautan Reset
                    </button>
                </form>

                {/* Back to login */}
                <div className="mt-6 text-center text-sm text-gray-600">
                    Sudah ingat kata sandi?{' '}
                    <Link to="/login" className="text-green-700 hover:underline font-medium">
                        Kembali ke Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
