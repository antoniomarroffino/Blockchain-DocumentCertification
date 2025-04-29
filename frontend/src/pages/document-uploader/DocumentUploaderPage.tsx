'use client'

import React, { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useUploadDocument } from "../../hook/backend/useUploadDocument";
import { useMetamask } from "../../hook/metamask/useMetamask";
import { toast } from 'react-hot-toast';

import WalletNotConnected from "../../components/common/WalletNotConnected";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import FilePreview from "../../components/common/FilePreview";
import FileDropzone from "./FileDropzone.tsx";
import FileCard from "./FileCard.tsx";
import ActionButtons from "./ActionButtons.tsx";

const DocumentUploaderPage = () => {
    const { isConnected, signer } = useMetamask();
    const [document, setDocument] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const { mutateAsync: uploadDocument, isPending: isUploadingDocument } = useUploadDocument();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showPreview, setShowPreview] = useState(false);

    const handleFileSelection = useCallback((file: File) => {
        const allowedTypes = [
            'application/pdf',
            'image/jpeg',
            'image/png',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        if (allowedTypes.includes(file.type)) {
            setDocument(file);
        } else {
            toast.error('Document format not supported');
        }
    }, []);

    const handleConfirmUpload = useCallback(async () => {
        if (!document || !signer) return;
        try {
            await uploadDocument({
                title: document.name,
                ownerWallet: signer.address,
                file: document
            });
            toast.success('Document loaded successfully!');
            setDocument(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (error) {
            toast.error('Error loading document: ' + error);
        }
    }, [document, signer, uploadDocument]);

    const handleCancelUpload = useCallback(() => {
        setDocument(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleFileSelection(files[0]);
        }
    }, [handleFileSelection]);

    if (!isConnected) {
        return <WalletNotConnected />;
    }

    if (isUploadingDocument) {
        return <LoadingOverlay message="Uploading document..." />;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card bg-neutral-800 border border-neutral-700 shadow-xl"
        >
            <div className="card-body p-6">
                <h2 className="card-title text-2xl text-white mb-6">Certify New Document</h2>

                <FileDropzone
                    onFileSelect={handleFileSelection}
                    isDragging={isDragging}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    fileInputRef={fileInputRef}
                    currentFile={document}
                />

                {document && (
                    <>
                        <FileCard
                            file={document}
                            onCancel={handleCancelUpload}
                        />
                        <ActionButtons
                            onPreview={() => setShowPreview(true)}
                            onCancel={handleCancelUpload}
                            onConfirm={handleConfirmUpload}
                        />
                    </>
                )}

                {showPreview && document && (
                    <FilePreview
                        file={document}
                        onClose={() => setShowPreview(false)}
                    />
                )}
            </div>
        </motion.div>
    );
};

export default DocumentUploaderPage;
