import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function Header() {
    const { pathname } = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Rekomendasi', path: '/recommendation' },
        { name: 'Forum', path: '/forum' },
        { name: 'Monitoring', path: '/monitoring' },
        { name: 'Tentang', path: '/about' },
    ];

    return (
        <motion.header
            className="bg-white shadow sticky top-0 z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-green-700 tracking-wide">🌱 CultivateAI</h1>
                <nav className="hidden md:flex items-center gap-6 text-sm">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={clsx(
                                'transition duration-200',
                                pathname === item.path
                                    ? 'text-green-700 font-semibold underline'
                                    : 'text-gray-700 hover:text-green-700'
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </motion.header>
    );
}
