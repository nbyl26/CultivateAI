import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
      <motion.div
        className="text-center max-w-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-extrabold text-green-700 mb-4 tracking-tight">
          🌱 CultivateAI
        </h1>
        <p className="mb-6 text-lg text-gray-700 leading-relaxed">
          AI-based smart solutions for smallholder farmers in Asia Pacific to create sustainable agriculture.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition-all duration-200 shadow-md"
        >
          Start Now
        </button>
      </motion.div>
    </div>
  );
}
