import { DocumentTextIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import {DocumentDTO} from "@dti-isin/backend-api-client"
import {useDocumentVerification} from "../hook/blockchain/useDocumentVerification.ts";
import {useDocumentCertification} from "../hook/blockchain/useDocumentCertification.ts";
import {calculateDocumentHash} from "../utils/hashGenerator.ts";
import { toast } from 'react-hot-toast';
import {useMetamask} from "../hook/useMetamask.ts";
import {ExclamationTriangleIcon} from "@heroicons/react/16/solid";
import {useGetFileContentByDocumentId} from "../hook/backend/useGetFileContentByDocumentId.ts";

interface DocumentCardProps {
    document: DocumentDTO;
}

const DocumentCard = ({ document }: DocumentCardProps) => {
    const [docHash, setDocHash] = useState<string | null>(null);
    const { data: isCertified, isLoading: isVerifying } = useDocumentVerification(docHash || '');
    const { mutateAsync: certifyDocument, isPending } = useDocumentCertification();
    const {data: documentContent, isLoading: isLoadingDocumentContent} = useGetFileContentByDocumentId(document.id!);
    const {signer} = useMetamask();

    useEffect(() => {
        const computeHash = async () => {
            if (!documentContent) return;
            try {
                const hash = await calculateDocumentHash({document, documentContent});
                setDocHash(hash);
            } catch (error) {
                console.error('Error computing document hash:', error);
                toast.error('Errore nel processamento del documento');
            }
        };

        computeHash();
    }, [document, documentContent]);

    const handleCertification = async () => {
        if (!docHash) return;

        try {
            if(!signer){
                console.error("Signer not setted");
                return;
            }

            if(!documentContent){
                return;
            }
            await toast.promise(
                certifyDocument({document, documentContent, signer}),
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

    if (isVerifying || !docHash) {
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
        <div
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow relative"
        >
            {isCertified ? (
                <div className="absolute top-2 right-2">
                    <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></div>
                    <CheckBadgeIcon className="h-6 w-6 text-green-600 relative" />
                </div>
            ) : (
                <div className="absolute top-2 right-2 animate-bounce">
                    <ExclamationTriangleIcon className="h-6 w-6 text-warning/80" />
                </div>
            )}

            <div className="card-body">
                <div className="flex items-start mb-4">
                    <DocumentTextIcon className="h-8 w-8 text-blue-600 mr-4" />
                    <div className="flex-1">
                        <h2 className="card-title text-base-content">{document.title}</h2>
                        <div className="flex items-center justify-between mt-1">
                            <p className="text-sm text-base-content/70">
                                {new Date(document.uploadTimestamp!).toLocaleDateString()}
                            </p>
                            <span className={`badge gap-2 ${isCertified ? 'badge-success' : 'badge-warning animate-text-pulse'}`}>
                                {isCertified ? (
                                    <>
                                        <CheckBadgeIcon className="h-4 w-4" />
                                        Certificato
                                    </>
                                ) : (
                                    <>
                                        <ExclamationTriangleIcon className="h-4 w-4" />
                                        Non Certificato
                                    </>
                                )}
                            </span>
                        </div>
                    </div>
                </div>

                {!isCertified && (
                    <div className={`mt-4 transition-opacity `}>
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


                {isCertified && (
                    <div className="mt-4 p-3 bg-success/10 rounded-lg border border-success/20">
                        <div className="flex items-center text-sm text-success">
                            <CheckBadgeIcon className="h-4 w-4 mr-2" />
                            <span className="font-mono break-all">
                                {docHash.slice(0, 12)}...{docHash.slice(-12)}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {isPending && (
                <div className="absolute inset-0 bg-base-100/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="loading loading-infinity loading-lg text-primary"></span>
                </div>
            )}
        </div>
    );
};

export default DocumentCard;