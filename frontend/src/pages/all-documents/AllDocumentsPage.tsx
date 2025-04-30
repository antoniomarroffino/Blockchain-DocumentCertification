'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { useGetAllDocuments } from "../../hook/backend/useGetAllDocuments";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import ErrorBanner from "../../components/common/ErrorBanner";
import DocumentCard from "../../components/common/DocumentCard";
import DocumentSearchBar from "../my-certified-documents/DocumentSearchBar.tsx";

const AllDocumentsPage = () => {
    const { data: documents, isLoading, isError } = useGetAllDocuments();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredDocs = documents?.filter((doc) =>
        doc.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) return <LoadingOverlay message="Loading documents..." />;
    if (isError) return <ErrorBanner message="Error loading documents." />;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card bg-neutral-800 border border-neutral-700 shadow-xl"
        >
            <div className="card-body p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="card-title text-2xl text-white">All Documents</h2>
                </div>

                <div className="mb-6">
                    <DocumentSearchBar
                        searchTerm={searchTerm}
                        onChange={setSearchTerm}
                    />
                </div>

                {filteredDocs?.length === 0 ? (
                    <p className="text-neutral-400">No documents found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredDocs!.map((doc, index) => (
                            <motion.div
                                key={doc.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <DocumentCard document={doc} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default AllDocumentsPage;
