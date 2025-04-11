import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ExclamationTriangleIcon,
    CloudArrowUpIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/solid';
import { useUploadDocument } from "../hook/backend/useUploadDocument.ts";
import { signer } from "../../config/config.ts";

const DocumentUploader: React.FC = () => {
    const [document, setDocument] = useState<File | null>(null);
    const [isCertified, setIsCertified] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { mutateAsync: uploadDocument } = useUploadDocument();

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const allowedTypes = [
            'application/pdf',
            'image/jpeg',
            'image/png',
            'application/docx'
        ];

        if (file && allowedTypes.includes(file.type)) {
            setIsUploading(true);
            setDocument(file);
            setIsCertified(false);

            try {
                await uploadDocument({
                    title: file.name,
                    ownerWallet: signer.address,
                });
                setIsCertified(true);
            } catch (error) {
                console.error('Upload failed:', error);
            } finally {
                setIsUploading(false);
            }
        } else {
            alert('Unsupported document format');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8"
        >
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                        Document Certification
                    </h2>
                    <p className="text-slate-500 mt-2">
                        Upload your document to get it certified on the blockchain
                    </p>
                </div>

                <motion.div
                    className="bg-white rounded-3xl shadow-xl overflow-hidden"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="p-8">
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileUpload}
                            accept=".pdf,.jpg,.jpeg,.png,.docx"
                        />

                        <AnimatePresence mode="wait">
                            {!document ? (
                                <motion.div
                                    key="upload"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => fileInputRef.current?.click()}
                                    className="cursor-pointer group"
                                >
                                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 transition-all
                                                  group-hover:border-primary/50 group-hover:bg-primary/5">
                                        <div className="flex flex-col items-center">
                                            <CloudArrowUpIcon className="h-20 w-20 text-slate-300 group-hover:text-primary/70 transition-colors" />
                                            <h3 className="text-xl font-semibold mt-4 text-slate-700">
                                                Drop your document here
                                            </h3>
                                            <p className="text-slate-500 mt-2 text-center">
                                                or click to browse<br />
                                                Supported formats: PDF, JPEG, PNG, DOCX
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="document"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-4"
                                >
                                    <div className="bg-slate-50 rounded-xl p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                {isUploading ? (
                                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                                                ) : isCertified ? (
                                                    <ShieldCheckIcon className="h-8 w-8 text-success" />
                                                ) : (
                                                    <ExclamationTriangleIcon className="h-8 w-8 text-warning" />
                                                )}
                                                <div>
                                                    <p className="font-medium text-slate-700">{document.name}</p>
                                                    <p className="text-sm text-slate-500">
                                                        {(document.size / 1024).toFixed(2)} KB
                                                    </p>
                                                </div>
                                            </div>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => fileInputRef.current?.click()}
                                                className="btn btn-outline btn-primary btn-sm"
                                                disabled={isUploading}
                                            >
                                                Change
                                            </motion.button>
                                        </div>
                                    </div>

                                    {isCertified && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-success/10 text-success rounded-xl p-4 flex items-center gap-3"
                                        >
                                            <ShieldCheckIcon className="h-5 w-5" />
                                            <span>Document successfully certified on blockchain</span>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default DocumentUploader;