'use client';

import {useState} from "react";
import {motion} from "framer-motion";
import {useGetAllDocuments} from "../../hook/backend/useGetAllDocuments";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import ErrorBanner from "../../components/common/ErrorBanner";
import DocumentCard from "../../components/common/DocumentCard";
import DocumentSearchBar from "../my-certified-documents/DocumentSearchBar";
import {useDocumentCertifiersMap} from "../../hook/blockchain/useDocumentCertifiersMap.ts";
import {DocumentDTO} from "@dti-isin/backend-api-client";
import {useBatchDocumentCertification} from "../../hook/blockchain/useBatchDocumentCertification.ts";
import {useMetamask} from "../../hook/metamask/useMetamask";
import toast from "react-hot-toast";
import CertifierGuard from "./CertifierGuard.tsx";
import {InformationCircleIcon} from "@heroicons/react/16/solid";

const AllDocumentsPage = () => {
    const {data: documents, isLoading, isError} = useGetAllDocuments();
    const [searchTerm, setSearchTerm] = useState("");
    const [certifierSearchTerm, setCertifierSearchTerm] = useState("");
    const [selected, setSelected] = useState<Set<number>>(new Set());

    const {signer} = useMetamask();
    const {data: certifiersMap = {}} = useDocumentCertifiersMap(documents);
    const {mutateAsync: certifyBatch, isPending} = useBatchDocumentCertification();

    const toggleSelect = (docId: number) => {
        setSelected(prev => {
            const next = new Set(prev);
            if (next.has(docId)) next.delete(docId);
            else next.add(docId);
            return next;
        });
    };

    const handleBatchCertify = async () => {
        if (!signer || !documents) return;
        const selectedDocs = documents.filter(doc => selected.has(doc.id!));
        try {
            await toast.promise(
                certifyBatch({documents: selectedDocs, signer}),
                {
                    loading: "Certifying selected documents...",
                    success: "Batch certification complete!",
                    error: (err: Error) => `Error: ${err.message}`,
                }
            );
            setSelected(new Set()); // Reset selection
        } catch (err) {
            console.error(err);
        }
    };

    const filteredDocs = documents?.filter((doc: DocumentDTO) => {
        const titleMatch = doc.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const certifier = certifiersMap[doc.id!]?.toLowerCase() || "";
        const certifierMatch = certifier.includes(certifierSearchTerm.toLowerCase());
        return titleMatch && certifierMatch;
    });

    if (isLoading) return <LoadingOverlay message="Loading documents..."/>;
    if (isError) return <ErrorBanner message="Error loading documents."/>;

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className="card bg-neutral-800 border border-neutral-700 shadow-xl"
        >
            <div className="card-body p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-2">
                    <h2 className="card-title text-2xl text-white">All Documents</h2>

                    <CertifierGuard>
                        <div
                            className="bg-yellow-100/10 border border-yellow-400 rounded-lg p-3 flex items-center gap-2 max-w-full md:max-w-lg md:ml-auto">
                            <InformationCircleIcon className="w-5 h-5 text-yellow-400 shrink-0"/>
                            <p className="text-sm text-yellow-300 leading-snug">
                                You can select multiple documents using the checkboxes and certify them all at once.
                            </p>
                        </div>
                    </CertifierGuard>


                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by certifier address (0x...)"
                        value={certifierSearchTerm}
                        onChange={(e) => setCertifierSearchTerm(e.target.value)}
                        className="input input-bordered w-full bg-neutral-700 text-white placeholder:text-neutral-400"
                    />
                </div>

                <div className="mb-6">
                    <DocumentSearchBar searchTerm={searchTerm} onChange={setSearchTerm}/>
                </div>

                <CertifierGuard>
                    {selected.size > 0 && (
                        <div className="mb-4">
                            <button
                                onClick={handleBatchCertify}
                                disabled={isPending}
                                className="btn btn-warning text-black w-full md:w-auto"
                            >
                                {isPending ? "Certifying..." : `Certify ${selected.size} Selected`}
                            </button>
                        </div>
                    )}
                </CertifierGuard>

                {filteredDocs?.length === 0 ? (
                    <p className="text-neutral-400">No documents found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredDocs!.map((doc, index) => (
                            <motion.div
                                key={doc.id}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.4, delay: index * 0.05}}
                            >

                                <DocumentCard
                                    document={doc}
                                    certifier={certifiersMap[doc.id!]}
                                    selectable={true}
                                    selected={selected.has(doc.id!)}
                                    onToggle={toggleSelect}
                                />

                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default AllDocumentsPage;
