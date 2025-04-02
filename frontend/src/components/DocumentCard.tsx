import { DocumentTextIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import {Document} from "@dti-isin/backend-api-client"
import {useDocumentVerification} from "../hook/blockchain/useDocumentVerification.ts";
import {useDocumentCertification} from "../hook/blockchain/useDocumentCertification.ts";
import {calculateDocumentHash} from "../utils/hashGenerator.ts";
import { toast } from 'react-hot-toast';

interface DocumentCardProps {
    document: Document;
}

const DocumentCard = ({ document }: DocumentCardProps) => {
    const [docHash, setDocHash] = useState<string | null>(null);
    const { data: isCertified, isLoading: isVerifying } = useDocumentVerification(docHash || '');
    const { mutateAsync: certifyDocument, isPending } = useDocumentCertification();
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const computeHash = async () => {
            try {
                const hash = await calculateDocumentHash(document);
                setDocHash(hash);
            } catch (error) {
                console.error('Error computing document hash:', error);
                toast.error('Errore nel processamento del documento');
            }
        };

        computeHash();
    }, [document]);

    const handleCertification = async () => {
        if (!docHash) return;

        try {
            await toast.promise(
                certifyDocument(document),
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
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex items-center space-x-4">
                        <div className="skeleton h-8 w-8 rounded-full"></div>
                        <div className="space-y-2 flex-1">
                            <div className="skeleton h-4 w-32"></div>
                            <div className="skeleton h-3 w-24"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isCertified && (
                <div className="absolute top-2 right-2">
                    <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></div>
                    <CheckBadgeIcon className="h-6 w-6 text-green-600 relative" />
                </div>
            )}

            <div className="card-body">
                <div className="flex items-start mb-4">
                    <DocumentTextIcon className="h-8 w-8 text-blue-600 mr-4" />
                    <div className="flex-1">
                        <h2 className="card-title text-gray-800">{document.title}</h2>
                        <div className="flex items-center justify-between mt-1">
                            <p className="text-sm text-gray-500">
                                {new Date(document.uploadTimestamp!).toLocaleDateString()}
                            </p>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                isCertified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                {isCertified ? 'Certificato' : 'In attesa'}
              </span>
                        </div>
                    </div>
                </div>

                {isHovered && !isCertified && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
                        <button
                            onClick={handleCertification}
                            className="btn btn-primary gap-2 animate-pulse"
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
                                    Certifica Documento
                                </>
                            )}
                        </button>
                    </div>
                )}

                {isCertified && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center text-sm text-green-700">
                            <CheckBadgeIcon className="h-4 w-4 mr-2" />
                            <span>Hash documento: {docHash.slice(0, 12)}...{docHash.slice(-12)}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DocumentCard;