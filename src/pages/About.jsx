import { motion } from 'framer-motion';

export default function About() {
    return (
        <motion.div
            className="max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h1 className="text-3xl font-bold mb-6 text-green-700 text-center">
                🌿 Tentang CultivateAI
            </h1>

            <p className="mb-4 text-gray-700 leading-relaxed text-justify">
                <strong>CultivateAI</strong> adalah aplikasi berbasis AI yang dirancang untuk membantu
                petani kecil di wilayah Asia Pasifik. Tujuan kami adalah menghadirkan teknologi pintar
                yang mudah diakses untuk meningkatkan produktivitas dan ketahanan pangan.
            </p>

            <div className="mb-6">
                <h2 className="text-xl font-semibold text-green-800 mb-2">✨ Fitur Utama:</h2>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Rekomendasi tanaman berdasarkan lokasi dan musim</li>
                    <li>Monitoring pertumbuhan tanaman secara manual</li>
                    <li>Forum diskusi antar petani untuk berbagi pengalaman</li>
                    <li>Chatbot AI (Gemini) untuk tanya-jawab dan solusi instan</li>
                </ul>
            </div>

            <p className="text-gray-700 leading-relaxed text-justify">
                Solusi ini dikembangkan dalam rangka{' '}
                <strong>Google Solution Challenge 2025</strong> sebagai upaya pemberdayaan komunitas
                pertanian lokal dengan pendekatan teknologi yang cerdas, berkelanjutan, dan terjangkau.
            </p>
        </motion.div>
    );
}
