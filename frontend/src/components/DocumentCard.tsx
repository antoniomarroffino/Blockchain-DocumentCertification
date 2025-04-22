import { DocumentTextIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import {DocumentDTO} from "@dti-isin/backend-api-client"
import {useDocumentCertification} from "../hook/blockchain/useDocumentCertification.ts";
import { toast } from 'react-hot-toast';
import {useMetamask} from "../hook/useMetamask.ts";
import CertificationBadge from "./CertificationBadge.tsx";

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
                    loading: 'Certificazione in corso...',
                    success: 'Documento certificato con successo!',
                    error: (err: Error) => `Errore nella certificazione: ${err.message}`
                }
            );
        } catch (error) {
            console.error('Certification error:', error);
        }
    };

    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow relative">
            <div className="card-body">
                <div className="flex items-start mb-4">
                    <DocumentTextIcon className="h-8 w-8 text-blue-600 mr-4" />
                    <div className="flex-1">
                        <h2 className="card-title text-base-content">{document.title}</h2>
                        <div className="flex items-center justify-between mt-1">
                            <p className="text-sm text-base-content/70">
                                {new Date(document.uploadTimestamp!).toLocaleDateString()}
                            </p>
                            <CertificationBadge docHash={document.hash!} setIsCertified={setIsCertified} />
                        </div>
                    </div>
                </div>

                {!isCertified && (
                    <div className="mt-4">
                        <button
                            onClick={handleCertification}
                            className="btn btn-block btn-primary gap-2"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Certificando...
                                </>
                            ) : (
                                <>
                                    <CheckBadgeIcon className="h-5 w-5" />
                                    Certifica Ora
                                </>
                            )}
                        </button>
                    </div>
                )}

                {isPending && (
                    <div className="absolute inset-0 bg-base-100/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <span className="loading loading-infinity loading-lg text-primary"></span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DocumentCard;