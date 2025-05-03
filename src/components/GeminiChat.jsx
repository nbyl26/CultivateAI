import { useState } from 'react';
import axios from 'axios';

export default function GeminiChat() {
    const [input, setInput] = useState('');
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);

    const API_KEY = "AIzaSyBlf0OnGKGxok-XJp_FMCj2i-jph5dAvZA";

    const sendMessage = async () => {
        if (!input.trim()) return;
        setLoading(true);

        const userMessage = { role: "user", parts: [{ text: input }] };
        const newChat = [...chat, userMessage];

        try {
            const res = await axios.post(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY,
                {
                    contents: newChat,
                }
            );

            const botResponse = {
                role: "model",
                parts: [{ text: res.data.candidates[0].content.parts[0].text }],
            };

            setChat([...newChat, botResponse]);
            setInput('');
        } catch (err) {
            alert("Error: " + err.message);
        }

        setLoading(false);
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <div className="bg-white border rounded h-96 overflow-y-scroll p-4 mb-4 space-y-2">
                {chat.map((msg, idx) => (
                    <div key={idx} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
                        <div className={`inline-block p-2 rounded ${msg.role === 'user' ? 'bg-green-100' : 'bg-blue-100'}`}>
                            {msg.parts[0].text}
                        </div>
                    </div>
                ))}
                {loading && <p className="text-gray-400">Mengetik...</p>}
            </div>

            <div className="flex gap-2">
                <input
                    className="border w-full p-2 rounded"
                    type="text"
                    placeholder="Tanyakan sesuatu..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={sendMessage}>
                    Kirim
                </button>
            </div>
        </div>
    );
}
