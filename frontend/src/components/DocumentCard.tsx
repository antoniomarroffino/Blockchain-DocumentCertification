import { DocumentTextIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import {DocumentDTO} from "@dti-isin/backend-api-client"
import {useDocumentCertification} from "../hook/blockchain/useDocumentCertification.ts";
import {calculateDocumentHash} from "../utils/hashGenerator.ts";
import { toast } from 'react-hot-toast';
import {useMetamask} from "../hook/useMetamask.ts";
import {useGetFileContentByDocumentId} from "../hook/backend/useGetFileContentByDocumentId.ts";
import CertificationBadge from "./CertificationBadge.tsx";

interface DocumentCardProps {
    document: DocumentDTO;
}

const DocumentCard = ({ document }: DocumentCardProps) => {
    const [docHash, setDocHash] = useState<string | undefined>(undefined);
    const { mutateAsync: certifyDocument, isPending } = useDocumentCertification();
    const { data: documentContent, isLoading: isLoadingDocumentContent } = useGetFileContentByDocumentId(document.id!);
    const { signer } = useMetamask();
    const [isCertified, setIsCertified] = useState<boolean>(false);

    useEffect(() => {
        const computeHash = async () => {
            if (!documentContent) return;
            try {
                const hash = await calculateDocumentHash({ document, documentContent });
                setDocHash(hash);
            } catch (error) {
                console.error('Error computing document hash:', error);
                toast.error('Errore nel processamento del documento');
            }
        };

        computeHash();
    }, [document, documentContent]);

    const handleCertification = async () => {
        if (!docHash || !signer || !documentContent) return;

        try {
            await toast.promise(
                certifyDocument({ document, documentContent, signer }),
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

    if (isLoadingDocumentContent || !docHash) {
        return (
            <div className="card bg-base-100 shadow-xl animate-pulse">
                <div className="card-body">
                    <div className="flex items-center space-x-4">
                        <div className="rounded-full bg-base-300 h-8 w-8"></div>
                        <div className="space-y-2 flex-1">
                            <div className="h-4 bg-base-300 rounded w-3/4"></div>
                            <div className="h-3 bg-base-300 rounded w-1/2"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
                            <CertificationBadge docHash={docHash} setIsCertified={setIsCertified} />
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