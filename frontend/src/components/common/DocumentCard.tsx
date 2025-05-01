'use client';

import {CheckBadgeIcon, ClipboardDocumentCheckIcon, DocumentTextIcon, TrashIcon} from '@heroicons/react/24/outline';
import {DocumentDTO} from "@dti-isin/backend-api-client";
import {useDocumentCertification} from "../../hook/blockchain/useDocumentCertification";
import {toast} from 'react-hot-toast';
import {useMetamask} from "../../hook/metamask/useMetamask";
import CertificationBadge from "../../pages/my-documents/CertificationBadge";
import {motion} from 'framer-motion';
import {formatAddress} from '../../utils/formatAddress';
import {Link} from "react-router-dom";
import {useDocumentHistory} from '../../hook/blockchain/useDocumentHistory';
import CertifierGuard from "../../pages/all-documents/CertifierGuard";
import {Dialog} from '@headlessui/react';
import {useRevokeCertification} from "../../hook/blockchain/useRevokeCertification";
import {useState} from "react";
import {useRemainingRevocations} from "../../hook/blockchain/useRemainingRevocation.ts";
import {useDocumentRevocations} from "../../hook/blockchain/useDocumentRevocations.ts";

interface DocumentCardProps {
    document: DocumentDTO;
    certifier?: string;
    selectable?: boolean;
    selected?: boolean;
    onToggle?: (docId: number) => void;
}

const DocumentCard = ({document, certifier, selectable = false, selected = false, onToggle}: DocumentCardProps) => {
    const {mutateAsync: certifyDocument, isPending} = useDocumentCertification();
    const {mutateAsync: revokeCertification} = useRevokeCertification();
    const {signer} = useMetamask();
    const [showModal, setShowModal] = useState(false);
    const [reason, setReason] = useState("");

    const {data: history = [], isLoading: isLoadingHistory} = useDocumentHistory(document.hash);
    const {data: remainingRevokes = 0} = useRemainingRevocations(document.hash!, signer?.address);
    const {data: revocations = []} = useDocumentRevocations(document.hash);


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

    const handleRevoke = async () => {
        if (!signer || !reason.trim()) return;
        try {
            await toast.promise(
                revokeCertification({docHash: document.hash!, reason, signer}),
                {
                    loading: "Revoking certification...",
                    success: "Certification revoked!",
                    error: (err: Error) => `Revocation error: ${err.message}`
                }
            );
            setShowModal(false);
            setReason("");
        } catch (err) {
            console.error("Revocation failed:", err);
        }
    };

    const hasCertified = history.some(entry =>
        signer?.address?.toLowerCase() === entry.certifier.toLowerCase()
    );

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
                {revocations.length > 0 && (
                    <div className="flex items-center text-xs text-red-400 mt-1 gap-2">
                        <TrashIcon className="h-4 w-4"/>
                        <span>
      Total revocations: <span className="font-bold">{revocations.length}</span>
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

                    {hasCertified && remainingRevokes > 0 && (
                        <button
                            onClick={() => setShowModal(true)}
                            className="btn btn-sm mt-2 bg-red-600 text-white hover:bg-red-500 w-full"
                        >
                            <TrashIcon className="h-4 w-4 mr-1"/>
                            Revoke Certification
                        </button>
                    )}
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
                                className="btn btn-sm btn-outline w-full text-white border-yellow-400 hover:bg-yellow-400 hover:text-black transition"
                            >
                                View Certification History
                            </button>
                        </Link>
                    </div>
                )}
            </div>

            {/* Revoke Modal */}
            <Dialog open={showModal} onClose={() => setShowModal(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/60" aria-hidden="true"/>
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel
                        className="bg-neutral-800 border border-neutral-700 p-6 rounded-xl max-w-sm w-full space-y-4">
                        <Dialog.Title className="text-white text-lg font-bold">Revoke Certification</Dialog.Title>
                        <textarea
                            className="textarea textarea-bordered w-full bg-neutral-700 text-white"
                            placeholder="Reason for revocation..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setShowModal(false)} className="btn btn-sm">
                                Cancel
                            </button>
                            {remainingRevokes > 0 && (
                                <button
                                    onClick={handleRevoke}
                                    disabled={!reason.trim()}
                                    className="btn btn-sm bg-red-600 text-white hover:bg-red-500"
                                >
                                    Confirm Revoke
                                </button>
                            )}
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </motion.div>
    );
};

export default DocumentCard;
