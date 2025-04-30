'use client';

import { useMetamask } from "../../hook/metamask/useMetamask";
import { useGetAllDocumentsGivenAddressWallet } from "../../hook/backend/useGetAllDocumentsGivenAddressWallet";
import { DocumentDTO } from "@dti-isin/backend-api-client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DocumentCard from "../../components/common/DocumentCard";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import ErrorBanner from "../../components/common/ErrorBanner";
import WalletNotConnected from "../../components/common/WalletNotConnected";
import { documentCertificationContractNoTX } from "../../../config/config";
import DocumentSearchBar from "./DocumentSearchBar.tsx";

const MyCertifiedDocumentsPage = () => {
    const { signer, isConnected } = useMetamask();
    const [certifiedDocs, setCertifiedDocs] = useState<DocumentDTO[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const { data: docs, isLoading, isError } = useGetAllDocumentsGivenAddressWallet(
        signer?.address ?? ""
    );

    useEffect(() => {
        const verifyDocs = async () => {
            if (!docs || !documentCertificationContractNoTX) return;

            const filtered = await Promise.all(
                docs.map(async (doc) => {
                    const isCertified = await documentCertificationContractNoTX.isDocumentCertified(doc.hash!);
                    return isCertified ? doc : null;
                })
            );

            setCertifiedDocs(filtered.filter(Boolean) as DocumentDTO[]);
        };

        verifyDocs();
    }, [docs]);

    if (!isConnected) return <WalletNotConnected />;
    if (isLoading) return <LoadingOverlay message="Loading certified documents..." />;
    if (isError) return <ErrorBanner message="Failed to load documents." />;

    const filteredDocs = certifiedDocs.filter((doc) =>
        doc.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card bg-neutral-800 border border-neutral-700 shadow-xl"
        >
            <div className="card-body p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="card-title text-2xl text-white">My Certified Documents</h2>
                </div>

                <DocumentSearchBar
                    searchTerm={searchTerm}
                    onChange={(value) => setSearchTerm(value)}
                />

                {filteredDocs.length === 0 ? (
                    <p className="text-neutral-400 mt-4">No certified documents match your search.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
                        {filteredDocs.map((doc) => (
                            <DocumentCard key={doc.id} document={doc} />
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default MyCertifiedDocumentsPage;
