import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard');
        } catch (err) {
            alert('Login gagal: ' + err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <input className="w-full mb-2 p-2 border" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input className="w-full mb-4 p-2 border" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button className="bg-green-500 text-white w-full py-2 rounded" type="submit">Login</button>
                <p className="mt-2 text-sm">Belum punya akun? <a href="/register" className="text-blue-500">Daftar</a></p>
            </form>
        </div>
    );
}
