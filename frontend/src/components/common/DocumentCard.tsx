'use client';

import {CheckBadgeIcon, ClipboardDocumentCheckIcon, DocumentTextIcon,} from '@heroicons/react/24/outline';
import {DocumentDTO} from "@dti-isin/backend-api-client";
import {useDocumentCertification} from "../../hook/blockchain/useDocumentCertification.ts";
import {toast} from 'react-hot-toast';
import {useMetamask} from "../../hook/metamask/useMetamask.ts";
import CertificationBadge from "../../pages/my-documents/CertificationBadge.tsx";
import {motion} from 'framer-motion';
import {formatAddress} from '../../utils/formatAddress.ts';
import {Link} from "react-router-dom";
import {useDocumentHistory} from '../../hook/blockchain/useDocumentHistory.ts';
import CertifierGuard from "../../pages/all-documents/CertifierGuard.tsx";

interface DocumentCardProps {
    document: DocumentDTO;
    certifier?: string;
    selectable?: boolean;
    selected?: boolean;
    onToggle?: (docId: number) => void;
}

const DocumentCard = ({document, certifier, selectable = false, selected = false, onToggle}: DocumentCardProps) => {
    const {mutateAsync: certifyDocument, isPending} = useDocumentCertification();
    const {signer} = useMetamask();

    const {data: history = [], isLoading: isLoadingHistory} = useDocumentHistory(document.hash);

    const handleCertification = async () => {
        if (!signer) return;

        try {
            await toast.promise(
                certifyDocument({document, signer}),
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
            whileHover={{scale: 1.02}}
            className={`card bg-neutral-800 border ${selected ? 'border-yellow-400' : 'border-neutral-700'} shadow-xl hover:shadow-yellow-500/20 transition-all relative`}
        >
            {selectable && (
                <CertifierGuard>
                    <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => onToggle?.(document.id!)}
                        className="checkbox checkbox-warning absolute top-2 right-2 z-20"
                    />
                </CertifierGuard>
            )}

            <div className="card-body p-6">
                <div className="flex items-start mb-4">
                    <DocumentTextIcon className="h-8 w-8 text-yellow-400 mr-4"/>
                    <div className="flex-1">
                        <h2 className="card-title text-white">{document.title}</h2>
                        <div className="flex items-center justify-between mt-1">
                            <p className="text-sm text-neutral-400">
                                {new Date(document.uploadTimestamp!).toLocaleDateString()}
                            </p>
                            <CertificationBadge docHash={document.hash!}/>
                        </div>
                    </div>
                </div>

                {certifier && (
                    <p className="text-xs text-neutral-400 mt-2">
                        Certified by: <span className="font-mono">{formatAddress(certifier)}</span>
                    </p>
                )}

                {!isLoadingHistory && history.length > 0 && (
                    <div className="flex items-center text-xs text-yellow-400 mt-2 gap-2">
                        <ClipboardDocumentCheckIcon className="h-4 w-4"/>
                        <span>
              Total certifications: <span className="font-bold">{history.length}</span>
            </span>
                    </div>
                )}

                <CertifierGuard>
                    <motion.button
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        onClick={handleCertification}
                        disabled={isPending}
                        className="btn bg-yellow-400 text-neutral-900 font-bold rounded-full gap-2 w-full hover:bg-yellow-300 transition mt-4"
                    >
                        {isPending ? (
                            <>
                                <span className="loading loading-spinner loading-sm"></span>
                                Certifying...
                            </>
                        ) : (
                            <>
                                <CheckBadgeIcon className="h-5 w-5"/>
                                {history.length === 0 ? 'Certify Now' : 'Certify Again'}
                            </>
                        )}
                    </motion.button>
                </CertifierGuard>

                {isPending && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md rounded-xl flex items-center justify-center z-20"
                    >
                        <span className="loading loading-infinity loading-lg text-yellow-400"></span>
                    </motion.div>
                )}

                {document.hash && (
                    <div className="mt-3">
                        <Link to={`/document-details/${document.hash}`}>
                            <button
                                className="btn btn-sm btn-outline w-full text-white border-yellow-400 hover:bg-yellow-400 hover:text-black transition">
                                View Certification History
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default DocumentCard;
