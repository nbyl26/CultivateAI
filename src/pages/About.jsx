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
                🌿 About CultivateAI
            </h1>

            <p className="mb-4 text-gray-700 leading-relaxed text-justify">
                <strong>CultivateAI</strong> is an AI-based application designed to help smallholder farmers in the Asia Pacific region. Our goal is to bring easily accessible smart technology to improve productivity and food security.
            </p>

            <div className="mb-6">
                <h2 className="text-xl font-semibold text-green-800 mb-2">✨ Key Features:</h2>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Crop recommendations based on location and season</li>
                    <li>Manual monitoring of crop growth</li>
                    <li>Discussion forum between farmers to share experiences</li>
                    <li>CultivateChat (AI Chat Bot) for instant questions and solutions</li>
                </ul>
            </div>

            <p className="text-gray-700 leading-relaxed text-justify">
                This solutions was developed in the framework of the{' '}
                <strong>APAC Solution Challenge 2025</strong> as an effort to emopower local farming communities with a smart, sustainable and affordable technology. We believe that by harnessing the power of AI, we can help farmers make informed decisions, optimize their resources, and ultimately improve their livelihoods.
            </p>
        </motion.div>
    );
}
