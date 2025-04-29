'use client'


import { motion } from "framer-motion";
import {useGetAllDocuments} from "../../hook/backend/useGetAllDocuments.ts";
import LoadingOverlay from "../../components/common/LoadingOverlay.tsx";
import ErrorBanner from "../../components/common/ErrorBanner.tsx";
import DocumentCard from "../../components/DocumentCard.tsx";

const AllDocuments = () => {
    const { data: documents, isLoading, isError } = useGetAllDocuments();

    if (isLoading) {
        return <LoadingOverlay message="Loading documents..." />;
    }

    if (isError) {
        return <ErrorBanner message="Error on loading documents." />;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto px-4 py-6"
        >
            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-extrabold text-white mb-8"
            >
                All Documents
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents?.map((doc, index) => (
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
        </motion.div>
    );
};

export default AllDocuments;
