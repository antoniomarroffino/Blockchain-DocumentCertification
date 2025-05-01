'use client';

import {useMetamask} from "../../hook/metamask/useMetamask";
import {useGetAllDocuments} from "../../hook/backend/useGetAllDocuments";
import {documentCertificationContractNoTX} from "../../../config/config";
import {useEffect, useState} from "react";
import {DocumentDTO} from "@dti-isin/backend-api-client";
import {motion} from "framer-motion";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import ErrorBanner from "../../components/common/ErrorBanner";
import WalletNotConnected from "../../components/common/WalletNotConnected";
import DocumentCard from "../../components/common/DocumentCard";
import DocumentSearchBar from "./DocumentSearchBar";
import {toast} from "react-hot-toast";

const MyCertifiedDocumentsPage = () => {
    const {signer, isConnected} = useMetamask();
    const {data: allDocs, isLoading, isError} = useGetAllDocuments();
    const [searchTerm, setSearchTerm] = useState("");
    const [myCertifiedDocs, setMyCertifiedDocs] = useState<DocumentDTO[]>([]);

    useEffect(() => {
        const fetchCertifiedDocs = async () => {
            if (!signer || !allDocs || !documentCertificationContractNoTX) return;

            try {
                const myAddress = await signer.getAddress();
                const hashes = await documentCertificationContractNoTX.getCertifiedDocumentsByAddress(myAddress);
                const hashSet = new Set(hashes.map((h) => h.toLowerCase()));
                const matchedDocs = allDocs.filter(doc => doc.hash && hashSet.has(doc.hash.toLowerCase()));
                setMyCertifiedDocs(matchedDocs);
            } catch (err) {
                console.error("Error fetching certified documents:", err);
                toast.error("Failed to load your certified documents.");
            }
        };

        fetchCertifiedDocs();
    }, [signer, allDocs]);

    if (!isConnected) return <WalletNotConnected/>;
    if (isLoading) return <LoadingOverlay message="Loading documents..."/>;
    if (isError) return <ErrorBanner message="Failed to load documents."/>;

    const filteredDocs = myCertifiedDocs.filter((doc) =>
        doc.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className="card bg-neutral-800 border border-neutral-700 shadow-xl"
        >
            <div className="card-body p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="card-title text-2xl text-white">Certified by Me</h2>
                </div>

                <DocumentSearchBar searchTerm={searchTerm} onChange={setSearchTerm}/>

                {filteredDocs.length === 0 ? (
                    <p className="text-neutral-400 mt-4">You have not certified any documents yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
                        {filteredDocs.map((doc) => (
                            <DocumentCard key={doc.id} document={doc}/>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default MyCertifiedDocumentsPage;
