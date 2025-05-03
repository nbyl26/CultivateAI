import { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
    collection,
    addDoc,
    onSnapshot,
    serverTimestamp,
    query,
    orderBy,
} from 'firebase/firestore';

export default function Forum() {
    const [message, setMessage] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'forums'), orderBy('timestamp', 'desc'));
        const unsub = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPosts(data);
        });

        return () => unsub();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        await addDoc(collection(db, 'forums'), {
            content: message,
            timestamp: serverTimestamp(),
        });

        setMessage('');
    };

    return (
        <>
            <h1 className="text-3xl font-bold mb-6 text-center">Forum Diskusi Petani</h1>

            <form onSubmit={handleSubmit} className="mb-6 max-w-xl mx-auto flex gap-2">
                <input
                    type="text"
                    placeholder="Tulis pertanyaan atau pengalamanmu..."
                    className="flex-1 p-2 border rounded"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">
                    Kirim
                </button>
            </form>

            <div className="max-w-xl mx-auto space-y-4">
                {posts.map((post) => (
                    <div key={post.id} className="bg-white p-4 rounded shadow">
                        <p>{post.content}</p>
                        <p className="text-xs text-gray-500 mt-2">
                            {post.timestamp?.toDate().toLocaleString() || 'Baru saja'}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
}
