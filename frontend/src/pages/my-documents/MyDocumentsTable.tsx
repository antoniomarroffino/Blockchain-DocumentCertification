'use client'

import { JsonRpcSigner } from "ethers";
import { useGetAllDocumentsGivenAddressWallet } from "../../hook/backend/useGetAllDocumentsGivenAddressWallet.ts";
import MyDocumentRow from "./MyDocumentRow.tsx";
import LoadingOverlay from "../../components/common/LoadingOverlay.tsx";
import ErrorBanner from "../../components/common/ErrorBanner.tsx";

interface MyDocumentsTableProps {
    signer: JsonRpcSigner;
}

const MyDocumentsTable = ({ signer }: MyDocumentsTableProps) => {
    const { data: documents, isLoading, isError } = useGetAllDocumentsGivenAddressWallet(signer.address);

    if (isLoading) {
        return <LoadingOverlay message="Loading documents..." />;
    }

    if (isError) {
        return <ErrorBanner message="Error loading documents. Please retry later." />;
    }

    return (
        <div className="space-y-4">
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
                        <MyDocumentRow key={doc.id} document={doc} />
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="md:hidden space-y-4">
                {documents?.map((doc) => (
                    <MyDocumentRow key={doc.id} document={doc} />
                ))}
            </div>
        </div>
    );
}

export default MyDocumentsTable;
