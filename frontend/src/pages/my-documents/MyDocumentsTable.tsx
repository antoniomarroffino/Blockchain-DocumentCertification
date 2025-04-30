'use client';

import { JsonRpcSigner } from "ethers";
import { useGetAllDocumentsGivenAddressWallet } from "../../hook/backend/useGetAllDocumentsGivenAddressWallet.ts";
import MyDocumentRow from "./MyDocumentRow.tsx";
import MyDocumentCard from "./MyDocumentCard.tsx";
import LoadingOverlay from "../../components/common/LoadingOverlay.tsx";
import ErrorBanner from "../../components/common/ErrorBanner.tsx";
import FilePreview from "../document-uploader/FilePreview.tsx";
import { useGetFileContentByDocumentId } from "../../hook/backend/useGetFileContentByDocumentId.ts";
import { useState } from "react";
import { DocumentDTO } from "@dti-isin/backend-api-client";

interface MyDocumentsTableProps {
    signer: JsonRpcSigner;
}

const MyDocumentsTable = ({ signer }: MyDocumentsTableProps) => {
    const { data: documents, isLoading, isError } = useGetAllDocumentsGivenAddressWallet(signer.address);
    const [selectedDocument, setSelectedDocument] = useState<DocumentDTO | null>(null);
    const { data: selectedBlob } = useGetFileContentByDocumentId(selectedDocument?.id ?? -1);

    const handleClosePreview = () => {
        setSelectedDocument(null);
    };

    if (isLoading) return <LoadingOverlay message="Loading documents..." />;
    if (isError) return <ErrorBanner message="Error loading documents. Please retry later." />;

    return (
        <div className="space-y-4 relative">
            {/* ✅ Desktop */}
            <div className="hidden md:block">
                <table className="table w-full border border-neutral-700 rounded-lg overflow-hidden">
                    <thead className="bg-neutral-800 text-neutral-400">
                    <tr>
                        <th className="w-1/2 p-4">Document</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">State</th>
                        <th className="p-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {documents?.map((doc) => (
                        <MyDocumentRow key={doc.id} document={doc} onPreview={() => setSelectedDocument(doc)} />
                    ))}
                    </tbody>
                </table>
            </div>

            {/* ✅ Mobile */}
            <div className="md:hidden space-y-4">
                {documents?.map((doc) => (
                    <MyDocumentCard key={doc.id} document={doc} onPreview={() => setSelectedDocument(doc)} />
                ))}
            </div>

            {selectedDocument && selectedBlob && (
                <div className="absolute inset-0 z-50">
                    <FilePreview file={selectedBlob} onClose={handleClosePreview} />
                </div>
            )}
        </div>
    );
};

export default MyDocumentsTable;
