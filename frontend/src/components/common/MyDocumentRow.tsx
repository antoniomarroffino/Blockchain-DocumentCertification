import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Document } from "@dti-isin/backend-api-client";
import { useState, useEffect } from "react";
import { useDocumentVerification } from "../../hook/blockchain/useDocumentVerification.ts";
import { calculateDocumentHash } from "../../utils/hashGenerator.ts";
import FilePreview from "./FilePreview.tsx";

interface MyDocumentRowProps {
    document: Document;
}

const MyDocumentRow = ({ document }: MyDocumentRowProps) => {
    const [docHash, setDocHash] = useState<string | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const { data: isCertified, isLoading: isVerifying } = useDocumentVerification(docHash || '');

    useEffect(() => {
        const computeHash = async () => {
            try {
                const hash = await calculateDocumentHash(document);
                setDocHash(hash);
            } catch (error) {
                console.error('Error computing document hash:', error);
            }
        };

        computeHash();
    }, [document]);

    const StatusBadge = () => {
        if (isVerifying) {
            return (
                <div className="badge badge-lg badge-ghost gap-2">
                    <span className="loading loading-spinner loading-xs"></span>
                    Verifica in corso
                </div>
            );
        }

        return isCertified ? (
            <div className="badge badge-lg badge-success gap-2">
                <CheckIcon className="w-4 h-4" />
                Certificato
            </div>
        ) : (
            <div className="badge badge-lg badge-error gap-2">
                <XMarkIcon className="w-4 h-4" />
                Non certificato
            </div>
        );
    };

    return (
        <>
            <tr className="hover:bg-base-200 transition-colors">
                <td>
                    <div className="flex items-center gap-3">
                        <DocumentTextIcon className="w-6 h-6 text-primary" />
                        <div>
                            <div className="font-bold">{document.title}</div>
                            <div className="text-sm text-gray-500">
                                {/*(document.content?.size / 1024).toFixed(2)*/} KB
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    {new Date(document.uploadTimestamp!).toLocaleDateString()}
                </td>
                <td>
                    <StatusBadge />
                </td>
                <td>
                    <button
                        onClick={() => setShowPreview(true)}
                        className="btn btn-ghost btn-sm"
                    >
                        Anteprima
                    </button>
                </td>
            </tr>

            {showPreview && document.content && (
                <FilePreview
                    file={document.content}
                    onClose={() => setShowPreview(false)}
                />
            )}
        </>
    );
}

export default MyDocumentRow;