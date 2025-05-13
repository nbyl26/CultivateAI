import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';

import Farmers from '../assets/images/farmers.png';
import Logo from '../assets/images/logo.png';

const googleProvider = new GoogleAuthProvider();

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Email atau password salah.');
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/dashboard');
        } catch (err) {
            setError('Login dengan Google gagal.');
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
                        <h1 className="text-3xl font-bold text-green-700">Log In</h1>
                        <p className="text-sm text-gray-500">Welcome back! Please enter your credentials.</p>
                    </div>

                    {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

                    <form onSubmit={handleLogin} className="space-y-4">
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
                        <div>
                            <label className="block text-sm mb-1 text-gray-600">Password</label>
                            <input
                                type="password"
                                placeholder="Your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <div className="text-right mt-1">
                                <Link to="/forgot-password" className="text-sm text-green-600 hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition font-medium"
                        >
                            Log In
                        </button>
                    </form>

                    <div className="mt-4 text-sm text-center text-gray-600">
                        Or log in with:
                    </div>
                    <div className="flex space-x-4 mt-3">
                        <button
                            onClick={handleGoogleLogin}
                            className="flex-1 flex items-center justify-center space-x-2 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                        >
                            <FcGoogle className="text-xl" />
                            <span className="text-sm">Google</span>
                        </button>
                    </div>

                    <div className="mt-6 text-sm text-center">
                        Don’t have an account?{' '}
                        <Link to="/register" className="text-green-700 hover:underline font-medium">
                            Sign Up
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
                    <h2 className="text-xl font-bold">Get the best agriculture insights</h2>
                    <p className="text-sm mt-2 text-center max-w-xs">
                        CultivateAI helps you to manage your farm with AI-powered insights and recommendations.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
