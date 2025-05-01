'use client'

import {motion} from 'framer-motion';

interface LoadingOverlayProps {
    message?: string;
}

const LoadingOverlay = ({message = "Loading..."}: LoadingOverlayProps) => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className="flex flex-col items-center justify-center h-64 space-y-4 text-white"
        >
            <span className="loading loading-infinity loading-lg text-yellow-400"></span>
            <p className="text-neutral-400">{message}</p>
        </motion.div>
    );
};

export default LoadingOverlay;
