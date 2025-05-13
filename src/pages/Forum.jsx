import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from 'firebase/firestore';
import Button from '../components/Button';
import Input from '../components/Input';
import { ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';

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
            user: {
                name: 'Petani Baru',
                avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=random',
            },
            likes: 0,
        });

        setMessage('');
    };

    return (
        <div className="min-h-screen bg-green-50 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl">
                <h1 className="text-4xl font-bold text-center text-green-800 mb-8">Forum Diskusi Petani</h1>

                {/* Input form */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="bg-gray-50 p-6 rounded-xl shadow-md mb-10 border border-gray-200"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tulis pertanyaan atau pengalamanmu..."
                        rows={4}
                        className="w-full p-4 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition text-sm"
                    ></textarea>
                    <div className="text-right mt-4">
                        <Button type="submit" color="bg-green-600 hover:bg-green-700 transition">
                            Send
                        </Button>
                    </div>
                </motion.form>

                {/* Posts */}
                <div className="space-y-6">
                    {posts.length === 0 ? (
                        <div className="text-center text-gray-500 italic">No discussion yet. Let's start the first conversation! 🌱</div>
                    ) : (
                        posts.map((post) => (
                            <motion.div
                                key={post.id}
                                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition relative"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <img src={post.user?.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=user'} alt="Avatar" className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">{post.user?.name || 'Pengguna Anonim'}</p>
                                        <p className="text-xs text-gray-500">{post.timestamp?.toDate().toLocaleString() || 'Baru saja'}</p>
                                    </div>
                                </div>

                                <p className="text-gray-700 mb-4">{post.content}</p>

                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <div className="flex items-center gap-2 cursor-pointer hover:text-green-600">
                                        <ThumbsUp size={16} />
                                        <span>{post.likes ?? 0} Like</span>
                                    </div>
                                    <div className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">#discussion</div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
