'use client'

import {CheckBadgeIcon, ExclamationTriangleIcon} from '@heroicons/react/24/outline';
import {useEffect} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {useDocumentVerification} from "../../hook/blockchain/useDocumentVerification.ts";

interface CertificationBadgeProps {
    docHash: string;
    setIsCertified?: (certified: boolean) => void;
}

const CertificationBadge = ({docHash, setIsCertified}: CertificationBadgeProps) => {
    const {data: isCertified, isLoading: isVerifying} = useDocumentVerification(docHash || '')

    useEffect(() => {
        if (setIsCertified && isCertified !== undefined) {
            setIsCertified(isCertified);
        }
    }, [isCertified, setIsCertified]);

    return (
        <AnimatePresence mode="wait">
            {isVerifying ? (
                <motion.div
                    key="verifying"
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0.8}}
                    className="flex items-center gap-2 bg-neutral-700 text-neutral-300 text-xs px-3 py-1 rounded-full animate-pulse"
                >
                    <div className="h-3 w-3 rounded-full bg-yellow-400 animate-ping"/>
                    Verifying...
                </motion.div>
            ) : isCertified ? (
                <motion.div
                    key="certified"
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0.8}}
                    className="flex items-center gap-2 bg-green-400/20 text-green-300 border border-green-400 text-xs px-3 py-1 rounded-full shadow-md"
                >
                    <CheckBadgeIcon className="h-4 w-4"/>
                    Certified
                </motion.div>
            ) : (
                <motion.div
                    key="not-certified"
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0.8}}
                    className="flex items-center gap-2 bg-red-400/20 text-red-300 border border-red-400 text-xs px-3 py-1 rounded-full shadow-md animate-pulse"
                >
                    <ExclamationTriangleIcon className="h-4 w-4"/>
                    Not Certified
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CertificationBadge;
