import { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
    deleteDoc,
    doc,
} from 'firebase/firestore';
import { motion } from 'framer-motion';
import { FaLeaf, FaStickyNote, FaTrash } from 'react-icons/fa';

export default function Monitoring() {
    const [plant, setPlant] = useState('');
    const [note, setNote] = useState('');
    const [data, setData] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!plant.trim()) return;

        await addDoc(collection(db, 'monitoring'), {
            plant,
            note,
            date: new Date().toLocaleDateString(),
            timestamp: serverTimestamp(),
        });

        setPlant('');
        setNote('');
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, 'monitoring', id));
    };

    useEffect(() => {
        const q = query(collection(db, 'monitoring'), orderBy('timestamp', 'desc'));
        const unsub = onSnapshot(q, (snapshot) => {
            const result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setData(result);
        });

        return () => unsub();
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-green-700 flex justify-center items-center gap-2">
                    📋 Plant Monitoring Tracker
                </h1>
                <p className="text-gray-600 mt-2 text-sm md:text-base max-w-xl mx-auto">
                    Record, track, and manage your plant growth efficiently.
                </p>
            </motion.div>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md border border-gray-100 p-6 rounded-xl max-w-xl mx-auto mb-10 space-y-4"
            >
                <div>
                    <label className="block text-gray-700 font-medium mb-1">🌿 Plant Name</label>
                    <input
                        type="text"
                        value={plant}
                        onChange={(e) => setPlant(e.target.value)}
                        placeholder="Enter plant name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">📝 Note (Optional)</label>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Write any observations or notes..."
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition"
                >
                    Save Monitoring Entry
                </button>
            </form>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                {data.length === 0 ? (
                    <p className="text-center text-gray-500">No monitoring data yet.</p>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {data.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white border border-gray-100 shadow-md p-5 rounded-xl"
                            >
                                <div className="flex items-center gap-2 text-green-700 font-semibold text-lg mb-1">
                                    <FaLeaf /> {item.plant}
                                </div>
                                <p className="text-sm text-gray-500">📅 Recorded: {item.date}</p>

                                {item.note && (
                                    <div className="mt-2 text-gray-700 text-sm flex gap-2">
                                        <FaStickyNote className="mt-1" />
                                        <span>{item.note}</span>
                                    </div>
                                )}

                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="mt-4 text-sm text-red-600 flex items-center gap-1 hover:underline"
                                >
                                    <FaTrash /> Delete
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
