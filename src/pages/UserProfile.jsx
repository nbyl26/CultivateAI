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
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto p-6 space-y-6"
        >
            <h1 className="text-3xl font-bold text-green-800">🌿 Your Profile</h1>
            <p className="text-gray-600">Welcome back, {displayName}!</p>

            <Card>
                <div className="p-6 flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-shrink-0">
                        <FaUserCircle className="w-16 h-16 text-green-600" />   
                    </div>
                    <div className="flex-1 space-y-2">
                        <h2 className="text-xl font-semibold">{displayName}</h2>
                        <p className="text-gray-600">{user?.email}</p>
                        <p className="text-sm text-gray-500">Member since: {user?.metadata?.creationTime?.split(',')[0]}</p>
                        <p className="text-sm text-gray-500">Location: {location}</p>
                        <Button className="mt-2">Edit Profile</Button>
                    </div>
                </div>
            </Card>

            <Card>
                <div className="p-6 space-y-4">
                    <h3 className="text-lg font-medium text-green-700">🔧 Account Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-600">Display Name</label>
                            <br />
                            <Input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Location</label>
                            <br />
                            <Input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="mt-1"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button onClick={handleUpdate} className="bg-green-600 hover:bg-green-700 text-white">
                            Save Changes
                        </Button>
                        <Button variant="outline" className="hover:border-red-600 text-red-600" onClick={handleDeleteAccount}>
                            Delete Account
                        </Button>
                    </div>
                </div>
            </Card>

            <Card>
                <div className="p-6">
                    <h3 className="text-lg font-medium text-green-700">📊 Recent Activity</h3>
                    <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
                        <li>Last searched crop: Corn (May 2025)</li>
                        <li>Forum posts: 5 contributions</li>
                        <li>Monitoring alerts: 2 active warnings</li>
                    </ul>
                </div>
            </Card>

            <div className="text-right">
                <Button variant="destructive" onClick={() => auth.signOut()}>Logout</Button>
            </div>
        </motion.div>
    );
}
