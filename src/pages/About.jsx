import { motion } from 'framer-motion';

export default function About() {
    return (
        <motion.div
            className="max-w-4xl mx-auto px-4 py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-green-700 flex justify-center items-center gap-2">
                    🌿 About CultivateAI
                </h1>
                <p className="text-gray-600 mt-2 text-sm md:text-base max-w-2xl mx-auto">
                    Empowering farmers with AI-driven solutions to cultivate a sustainable future.
                </p>
            </div>

            <section className="bg-white shadow-sm border border-gray-100 rounded-xl p-6 mb-10">
                <p className="text-gray-700 leading-relaxed text-justify text-base md:text-lg">
                    <strong>CultivateAI</strong> is an AI-based platform designed to assist smallholder farmers in the Asia Pacific region. Our mission is to make smart agricultural technology accessible to everyone — enhancing productivity, sustainability, and food security.
                </p>
            </section>

            <section className="bg-white shadow-sm border border-gray-100 rounded-xl p-6 mb-10">
                <h2 className="text-xl font-semibold text-green-800 mb-4">✨ Key Features</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 text-base md:text-lg">
                    <li>🌾 Crop recommendations tailored to your location and season</li>
                    <li>📋 Manual monitoring tools for crop growth tracking</li>
                    <li>💬 Farmer discussion forum for knowledge sharing</li>
                    <li>🤖 CultivateChat – an AI chatbot to answer questions instantly</li>
                </ul>
            </section>

            <section className="bg-white shadow-sm border border-gray-100 rounded-xl p-6">
                <p className="text-gray-700 leading-relaxed text-justify text-base md:text-lg">
                    This solution was developed as part of the <strong>APAC Solution Challenge 2025</strong> to support local farming communities with innovative, affordable, and sustainable tools. With AI at its core, CultivateAI helps farmers make smarter decisions, optimize their efforts, and enhance their quality of life.
                </p>
            </section>
        </motion.div>
    );
}
