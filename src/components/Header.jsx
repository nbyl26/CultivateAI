import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import clsx from 'clsx';
import { Menu, X } from 'lucide-react';
import { auth } from '../firebase';
import { LogOut } from 'lucide-react';

export default function Header() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Recommendation', path: '/recommendation' },
        { name: 'Forum', path: '/forum' },
        { name: 'Monitoring', path: '/monitoring' },
        { name: 'About', path: '/about' },
    ];

    const handleLogout = () => {
        auth.signOut();
        navigate('/login');
    };

    return (
        <motion.header
            className="bg-white shadow-lg sticky top-0 z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/dashboard" className="text-2xl font-bold text-green-700 tracking-wide flex items-center gap-2">
                    🌱 <span className="hidden sm:inline">CultivateAI</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={clsx(
                                'transition duration-300 px-4 py-2 rounded-md',
                                pathname === item.path
                                    ? 'bg-green-100 text-green-700 font-semibold'
                                    : 'text-gray-700 hover:text-green-700 hover:bg-green-50'
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-6">
                    {/* Profile Avatar with Routing */}
                    <Link to="/profile">
                        <img
                            src="https://ui-avatars.com/api/?name=User"
                            alt="Avatar"
                            className="w-10 h-10 rounded-full border border-green-300 hover:ring-2 hover:ring-green-500 cursor-pointer transition-all"
                            title="View Profile"
                        />
                    </Link>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition-all"
                    >
                        <LogOut className="w-5 h-5" /> Log Out
                    </button>
                </div>

                {/* Mobile - Avatar & Menu Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    <Link to="/profile">
                        <img
                            src="https://ui-avatars.com/api/?name=User"
                            alt="Avatar"
                            className="w-10 h-10 rounded-full border border-green-300 hover:ring-2 hover:ring-green-500 cursor-pointer transition-all"
                            title="View Profile"
                        />
                    </Link>

                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="md:hidden px-4 pb-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex flex-col gap-4 bg-white rounded-lg p-4 shadow-xl">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={clsx(
                                        'text-sm font-medium px-3 py-2 rounded-md transition',
                                        pathname === item.path
                                            ? 'bg-green-100 text-green-700 font-semibold'
                                            : 'text-gray-700 hover:text-green-700 hover:bg-green-50'
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            {/* Logout Mobile */}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 mt-4"
                            >
                                <LogOut className="w-5 h-5" /> Log Out
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
