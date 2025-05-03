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
import Input from '../components/Input';
import Button from '../components/Button';
import { motion } from 'framer-motion';

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
        <div className="max-w-2xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
                📋 Monitoring Tanaman
            </h1>

            <form
                onSubmit={handleSubmit}
                className="mb-8 bg-white p-6 rounded-xl shadow flex flex-col gap-4"
            >
                <Input
                    placeholder="🌿 Nama Tanaman"
                    value={plant}
                    onChange={(e) => setPlant(e.target.value)}
                />
                <Input
                    placeholder="📝 Catatan (opsional)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
                <Button type="submit" color="bg-green-600">
                    Simpan Data
                </Button>
            </form>

            <div className="space-y-4">
                {data.length === 0 && (
                    <p className="text-center text-gray-500">Belum ada data monitoring.</p>
                )}
                {data.map(item => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-4 rounded-xl shadow"
                    >
                        <h2 className="text-lg font-semibold text-green-800">{item.plant}</h2>
                        <p className="text-sm text-gray-500">📅 Dicatat: {item.date}</p>
                        {item.note && (
                            <p className="mt-2 text-gray-700">
                                📝 {item.note}
                            </p>
                        )}
                        <button
                            onClick={() => handleDelete(item.id)}
                            className="mt-4 text-sm text-red-600 underline"
                        >
                            Hapus
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
