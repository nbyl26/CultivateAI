import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import { toast } from 'sonner';
import { FaUserCircle } from "react-icons/fa";

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [displayName, setDisplayName] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setDisplayName(currentUser.displayName || 'Nbyl26');
                setLocation('Palembang'); // mock
            }
        });
        return () => unsubscribe();
    }, []);

    const handleUpdate = () => {
        toast.success('Profile updated (mock)');
    };

    const handleDeleteAccount = () => {
        const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.');
        if (confirmed) {
            toast.warning('Account deletion feature is not implemented.');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto p-6 space-y-6"
        >
            <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-green-700">🌿 Your Profile</h1>
                <p className="text-gray-600 text-sm md:text-base mt-1">
                    Welcome back, <strong>{displayName}</strong>!
                </p>
            </div>

            <Card>
                <div className="p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
                    <FaUserCircle className="w-20 h-20 text-green-600" />
                    <div className="flex-1 space-y-2">
                        <h2 className="text-xl font-semibold text-green-800">{displayName}</h2>
                        <p className="text-gray-600">{user?.email}</p>
                        <p className="text-sm text-gray-500">
                            🕒 Member since: {user?.metadata?.creationTime?.split(',')[0]}
                        </p>
                        <p className="text-sm text-gray-500">📍 Location: {location}</p>
                        <Button className="mt-2">Edit Profile</Button>
                    </div>
                </div>
            </Card>

            <Card>
                <div className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-green-700">🔧 Account Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-600">Display Name</label> <br />
                            <Input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Location</label><br />
                            <Input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="mt-1"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3 pt-2">
                        <Button onClick={handleUpdate} className="bg-green-600 hover:bg-green-700 text-white">
                            Save Changes
                        </Button>
                        <Button
                            variant="outline"
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={handleDeleteAccount}
                        >
                            Delete Account
                        </Button>
                    </div>
                </div>
            </Card>

            <Card>
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-green-700 mb-2">📊 Recent Activity</h3>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        <li>🔍 Last searched crop: <strong>Corn</strong> (May 2025)</li>
                        <li>💬 Forum posts: <strong>5 contributions</strong></li>
                        <li>⚠️ Monitoring alerts: <strong>2 active warnings</strong></li>
                    </ul>
                </div>
            </Card>

            <div className="text-right">
                <Button
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => auth.signOut()}
                >
                    Logout
                </Button>
            </div>
        </motion.div>
    );
}
