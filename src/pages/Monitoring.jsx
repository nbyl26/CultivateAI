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

import Layout from '../components/Layout';

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
        <Layout>
            <div className="min-h-screen bg-green-50 p-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Monitoring Tanaman</h1>

                <form onSubmit={handleSubmit} className="mb-6 max-w-xl mx-auto flex flex-col gap-2">
                    <input
                        type="text"
                        placeholder="Nama Tanaman"
                        value={plant}
                        onChange={(e) => setPlant(e.target.value)}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Catatan (opsional)"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="p-2 border rounded"
                    />
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                        Simpan
                    </button>
                </form>

                <div className="max-w-xl mx-auto space-y-4">
                    {data.map(item => (
                        <div key={item.id} className="bg-white p-4 rounded shadow">
                            <h2 className="font-semibold">{item.plant}</h2>
                            <p className="text-sm text-gray-600">Dicatat: {item.date}</p>
                            {item.note && <p className="mt-1">{item.note}</p>}
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="mt-2 text-red-600 text-sm underline"
                            >
                                Hapus
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
