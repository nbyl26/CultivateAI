import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/dashboard');
        } catch (err) {
            alert('Registrasi gagal: ' + err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-80">
                <h1 className="text-2xl font-bold mb-4">Daftar</h1>
                <input className="w-full mb-2 p-2 border" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input className="w-full mb-4 p-2 border" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button className="bg-blue-500 text-white w-full py-2 rounded" type="submit">Daftar</button>
                <p className="mt-2 text-sm">Sudah punya akun? <a href="/login" className="text-green-500">Login</a></p>
            </form>
        </div>
    );
}
