'use client'

import { DocumentTextIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { DocumentDTO } from "backend/target/backend-api-client/index.ts";
import { useDocumentCertification } from "../../hook/blockchain/useDocumentCertification.ts";
import { toast } from 'react-hot-toast';
import { useMetamask } from "../../hook/metamask/useMetamask.ts";
import CertificationBadge from "../../pages/my-documents/CertificationBadge.tsx";
import { motion } from 'framer-motion';

interface DocumentCardProps {
    document: DocumentDTO;
}

const DocumentCard = ({ document }: DocumentCardProps) => {
    const { mutateAsync: certifyDocument, isPending } = useDocumentCertification();
    const { signer } = useMetamask();
    const [isCertified, setIsCertified] = useState<boolean>(false);

    const handleCertification = async () => {
        if (!signer) return;

        try {
            await toast.promise(
                certifyDocument({ document, signer }),
                {
                    loading: 'Certifying...',
                    success: 'Document successfully certified!',
                    error: (err: Error) => `Certification error: ${err.message}`
                }
            );
        } catch (error) {
            console.error('Certification error:', error);
        }
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="card bg-neutral-800 border border-neutral-700 shadow-xl hover:shadow-yellow-500/20 transition-all relative"
        >
            <div className="card-body p-6">
                <div className="flex items-start mb-4">
                    <DocumentTextIcon className="h-8 w-8 text-yellow-400 mr-4" />
                    <div className="flex-1">
                        <h2 className="card-title text-white">{document.title}</h2>
                        <div className="flex items-center justify-between mt-1">
                            <p className="text-sm text-neutral-400">
                                {new Date(document.uploadTimestamp!).toLocaleDateString()}
                            </p>
                            <CertificationBadge docHash={document.hash!} setIsCertified={setIsCertified} />
                        </div>
                    </div>
                </div>

                {!isCertified && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCertification}
                        disabled={isPending}
                        className="btn bg-yellow-400 text-neutral-900 font-bold rounded-full gap-2 w-full hover:bg-yellow-300 transition"
                    >
                        {isPending ? (
                            <>
                                <span className="loading loading-spinner loading-sm"></span>
                                Certifying...
                            </>
                        ) : (
                            <>
                                <CheckBadgeIcon className="h-5 w-5" />
                                Certify Now
                            </>
                        )}
                    </motion.button>
                )}

                {isPending && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md rounded-xl flex items-center justify-center z-20"
                    >
                        <span className="loading loading-infinity loading-lg text-yellow-400"></span>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default DocumentCard;
