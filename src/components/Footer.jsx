import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <motion.footer
            className="bg-white text-center py-6 border-t text-sm text-gray-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <p>
                © {new Date().getFullYear()} <span className="text-green-700 font-semibold">CultivateAI</span>. All rights reserved.
            </p>
        </motion.footer>
    );
}
