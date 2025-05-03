import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from 'firebase/firestore';
import Button from '../components/Button'; // Assuming a reusable Button component
import Input from '../components/Input'; // Assuming a reusable Input component

export default function Forum() {
    const [message, setMessage] = useState('');
    const [posts, setPosts] = useState([]);

    // Fetch forum posts in real-time
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

    // Handle post submission
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
        <div className="min-h-screen bg-green-50 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-center text-green-800 mb-6">Forum Diskusi Petani</h1>

                {/* Message input form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
                    <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tulis pertanyaan atau pengalamanmu..."
                        className="border border-green-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                    />
                    <Button type="submit" color="bg-green-600 hover:bg-green-700 transition">
                        Kirim
                    </Button>
                </form>

                {/* Display posts */}
                <div className="space-y-6">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg border border-green-100 hover:shadow-xl transition">
                            <p className="text-gray-700">{post.content}</p>
                            <p className="text-xs text-gray-500 mt-2">
                                {post.timestamp?.toDate().toLocaleString() || 'Baru saja'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
