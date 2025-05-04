import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';

import Logo from '../assets/images/logo.png';
import Farmers from '../assets/images/farmers.png';

const googleProvider = new GoogleAuthProvider();

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Registrasi gagal: ' + err.message);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/dashboard');
        } catch (err) {
            setError('Gagal daftar dengan Google: ' + err.message);
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
                        <h1 className="text-3xl font-bold text-green-700">Sign Up</h1>
                        <p className="text-sm text-gray-500">Create your account and join the future of farming.</p>
                    </div>

                    {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

                    <form onSubmit={handleRegister} className="space-y-4">
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
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition font-medium"
                        >
                            Register
                        </button>
                    </form>

                    <div className="mt-4 text-sm text-center text-gray-600">
                        Or sign up with:
                    </div>

                    {/* Google Sign Up */}
                    <div className="flex space-x-4 mt-3">
                        <button
                            type="button"
                            onClick={handleGoogleSignUp}
                            className="w-full mb-4 border border-gray-300 hover:bg-gray-50 text-sm py-2 rounded flex items-center justify-center gap-2 transition"
                        >
                            <FcGoogle className="text-xl" />
                            <span className="text-sm">Google</span>
                        </button>
                    </div>

                    <div className="mt-6 text-sm text-center">
                        Already have an account?{' '}
                        <Link to="/login" className="text-green-700 hover:underline font-medium">
                            Log In
                        </Link>
                    </div>
                </div>

                <div className="w-1/2 bg-green-600 text-white flex flex-col items-center justify-center relative p-8">
                    <img
                        src={Farmers}
                        alt="Petani Ilustrasi"
                        className="w-3/4 mb-4 max-w-sm drop-shadow-xl"
                    />
                    <h2 className="text-xl font-bold">Welcome to CultivateAI</h2>
                    <p className="text-sm mt-2 text-center max-w-xs">
                        Sign up and help create the future of smart agriculture with CultivateAI.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
