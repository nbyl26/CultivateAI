import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-green-700">🌱 CultivateAI</h1>
            <nav className="space-x-4 text-sm">
                <Link to="/dashboard" className="hover:underline text-gray-700">Dashboard</Link>
                <Link to="/recommendation" className="hover:underline text-gray-700">Rekomendasi</Link>
                <Link to="/forum" className="hover:underline text-gray-700">Forum</Link>
                <Link to="/monitoring" className="hover:underline text-gray-700">Monitoring</Link>
                <Link to="/about" className="hover:underline text-gray-700">Tentang</Link>
            </nav>
        </header>
    );
}
