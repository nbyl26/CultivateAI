import { useNavigate } from 'react-router-dom';

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">🌱 CultivateAI</h1>
        <p className="mb-6 text-lg">Solusi pintar untuk pertanian berkelanjutan</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-green-600 text-white px-6 py-2 rounded text-lg hover:bg-green-700 transition"
        >
          Mulai Sekarang
        </button>
      </div>
    </div>
  );
}
