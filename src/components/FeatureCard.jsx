import { motion } from 'framer-motion';
import Button from './Button';

export default function FeatureCard({ title, description, onClick, color = 'bg-green-600' }) {
    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between"
        >
            <div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
            <div className="mt-4">
                <Button onClick={onClick} color={color}>
                    Buka
                </Button>
            </div>
        </motion.div>
    );
}
