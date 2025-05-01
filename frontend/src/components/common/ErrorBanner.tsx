'use client'

import {motion} from 'framer-motion';

interface ErrorBannerProps {
    message: string;
}

const ErrorBanner = ({message}: ErrorBannerProps) => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="alert bg-red-600/20 text-red-400 border border-red-600 shadow-lg p-4 flex items-center gap-4"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div className="flex-1">
                <h3 className="font-bold text-lg">Error!</h3>
                <p className="text-sm">{message}</p>
            </div>
        </motion.div>
    );
};

export default ErrorBanner;
