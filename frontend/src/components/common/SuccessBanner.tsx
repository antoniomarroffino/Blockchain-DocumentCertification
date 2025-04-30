'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface SuccessBannerProps {
    message: string;
    onClose: () => void;
}

const SuccessBanner = ({ message, onClose }: SuccessBannerProps) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className="bg-neutral-800 border border-green-400 rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4 relative"
            >
                <CheckCircleIcon className="w-16 h-16 text-green-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">{message}</h3>

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-neutral-400 hover:text-green-400 transition"
                >
                    ✕
                </button>
            </motion.div>
        </AnimatePresence>
    );
};

export default SuccessBanner;
