'use client';

import { format } from "date-fns";
import { useDocumentHistory, Certification } from "../../hook/blockchain/useDocumentHistory";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import ErrorBanner from "../../components/common/ErrorBanner";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

const DocumentDetailsPage = () => {
    const params = useParams();
    const docHash = params?.hash as string;

    const { data: history, isLoading, isError, error } = useDocumentHistory(docHash);

    if (isLoading) {
        return <LoadingOverlay message="Loading document history..." />;
    }

    if (isError) {
        return <ErrorBanner message={`Error loading history: ${error?.message}`} />;
    }

    if (!history || history.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card bg-neutral-800 border border-neutral-700 shadow-xl"
            >
                <div className="card-body p-6">
                    <h2 className="card-title text-2xl text-white break-words">Document Details</h2>
                    <p className="text-sm text-neutral-400 mt-1 break-all">Hash: {docHash}</p>
                    <p className="text-neutral-400 mt-4">This document has not been certified yet.</p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card bg-neutral-800 border border-neutral-700 shadow-xl"
        >
            <div className="card-body p-6">
                <div className="mb-6">
                    <h2 className="card-title text-2xl text-white break-words">Document Details</h2>
                    <p className="text-sm text-neutral-400 mt-1 break-all">Hash: {docHash}</p>
                </div>

                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Certification History</h3>
                    <div className="overflow-x-auto">
                        <table className="table w-full text-white">
                            <thead className="bg-neutral-700 text-white">
                            <tr>
                                <th>#</th>
                                <th>Certifier</th>
                                <th>Timestamp</th>
                            </tr>
                            </thead>
                            <tbody>
                            {history.map((item: Certification, index: number) => (
                                <tr key={index} className="bg-neutral-800 hover:bg-neutral-700 transition">
                                    <td>{index + 1}</td>
                                    <td className="break-all">{item.certifier}</td>
                                    <td>{format(new Date(Number(item.timestamp) * 1000), 'd MMM yyyy – HH:mm')}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DocumentDetailsPage;
