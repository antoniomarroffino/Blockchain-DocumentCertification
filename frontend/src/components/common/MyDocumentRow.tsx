import {DocumentTextIcon} from "@heroicons/react/24/outline";
import {DocumentDTO} from "@dti-isin/backend-api-client";
import {useEffect, useState} from "react";
import {calculateDocumentHash} from "../../utils/hashGenerator.ts";
import FilePreview from "./FilePreview.tsx";
import {useGetFileContentByDocumentId} from "../../hook/backend/useGetFileContentByDocumentId.ts";
import CertificationBadge from "../CertificationBadge.tsx";

interface MyDocumentRowProps {
    document: DocumentDTO;
}

const MyDocumentRow = ({document}: MyDocumentRowProps) => {
    const [docHash, setDocHash] = useState<string | undefined>(undefined);
    const [showPreview, setShowPreview] = useState(false);
    const {data: documentContent, isLoading: isLoadingDocumentContent} = useGetFileContentByDocumentId(document.id!);


    useEffect(() => {
        const computeHash = async () => {
            if (!documentContent) return;
            try {
                const hash = await calculateDocumentHash({document, documentContent});
                setDocHash(hash);
            } catch (error) {
                console.error('Error computing document hash:', error);
            }
        };

        computeHash();
    }, [document, documentContent]);

    return (
        <>
            <tr className="hover:bg-base-200 transition-colors">
                <td>
                    <div className="flex items-center gap-3">
                        <DocumentTextIcon className="w-6 h-6 text-primary"/>
                        <div>
                            <div className="font-bold">{document.title}</div>
                            <div className="text-sm text-gray-500">
                                {documentContent && (documentContent.size / 1024).toFixed(2)} KB
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    {new Date(document.uploadTimestamp!).toLocaleDateString()}
                </td>
                <td>
                    {isLoadingDocumentContent || !docHash ? (
                        <div className="badge gap-2 opacity-50">
                            <div className="h-4 w-4 rounded-full bg-base-300 animate-pulse"/>
                            Loading content
                        </div>
                    ) : (
                        <CertificationBadge docHash={docHash}/>
                    )}
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

            {showPreview && documentContent && (
                <FilePreview
                    file={documentContent as File}
                    onClose={() => setShowPreview(false)}
                />
            )}
        </>
    );
}

export default MyDocumentRow;