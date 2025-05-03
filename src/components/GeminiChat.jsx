import { useState } from 'react';
import axios from 'axios';
import Button from './Button';

export default function GeminiChat() {
    const [input, setInput] = useState('');
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);

    const API_KEY = 'AIzaSyBlf0OnGKGxok-XJp_FMCj2i-jph5dAvZA';

    const sendMessage = async () => {
        if (!input.trim()) return;

        setLoading(true);
        const userMessage = { role: 'user', parts: [{ text: input }] };
        const updatedChat = [...chat, userMessage];

        try {
            const res = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
                { contents: updatedChat }
            );

            const botResponse = {
                role: 'model',
                parts: [{ text: res.data.candidates[0].content.parts[0].text }],
            };

            setChat([...updatedChat, botResponse]);
            setInput('');
        } catch (err) {
            alert('Terjadi kesalahan: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 max-w-3xl mx-auto mt-10">
            <h2 className="text-xl font-semibold mb-4 text-green-700">💬 Gemini Chatbot</h2>
            <div className="h-72 overflow-y-auto border rounded-lg p-4 mb-4 bg-gray-50 space-y-3 text-sm">
                {chat.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`px-4 py-2 rounded-xl max-w-xs ${msg.role === 'user' ? 'bg-green-100 text-right' : 'bg-blue-100 text-left'
                                }`}
                        >
                            {msg.parts[0].text}
                        </div>
                    </div>
                ))}
                {loading && <p className="text-gray-400 italic">Gemini sedang mengetik...</p>}
            </div>

            <div className="flex gap-2">
                <input
                    className="border border-gray-300 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-green-400"
                    type="text"
                    placeholder="Tanyakan sesuatu..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button onClick={sendMessage} size="sm">
                    Kirim
                </Button>
            </div>
        </div>
    );
}
