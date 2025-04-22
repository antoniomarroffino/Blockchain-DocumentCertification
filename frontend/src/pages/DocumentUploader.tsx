'use client'
import {useCallback, useRef, useState} from 'react';
import {DocumentArrowUpIcon} from '@heroicons/react/24/solid';
import {useUploadDocument} from "../hook/backend/useUploadDocument.ts";
import {useMetamask} from "../hook/useMetamask.ts";
import {DocumentTextIcon} from "@heroicons/react/24/outline";
import {LockClosedIcon, XMarkIcon} from "@heroicons/react/16/solid";
import {toast} from 'react-hot-toast';
import FilePreview from "../components/common/FilePreview.tsx";

const DocumentUploader = () => {
    const {isConnected, signer} = useMetamask();
    const [document, setDocument] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const {mutateAsync: uploadDocument} = useUploadDocument();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showPreview, setShowPreview] = useState(false)

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
            toast.error('Formato documento non supportato');
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
            toast.success('Documento caricato con successo!');
            setDocument(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (error) {
            toast.error('Errore nel caricamento del documento' + error);
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
            const file = files[0];
            handleFileSelection(file);
        }
    }, [handleFileSelection]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelection(file);
        }
    };

    if (!isConnected) {
        return (
            <div className="hero min-h-[50vh]">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <LockClosedIcon className="w-12 h-12 text-primary mx-auto mb-4"/>
                        <h2 className="text-2xl font-bold mb-4">Wallet Not Connected</h2>
                        <p className="mb-6">Please connect your wallet to start certifying documents</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-6">Certify New Document</h2>
                <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        isDragging ? 'border-primary bg-primary/10' : 'border-base-300'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleInputChange}
                        accept=".pdf,.jpg,.jpeg,.png,.docx"
                    />
                    <div
                        className="flex flex-col items-center gap-4 cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <DocumentArrowUpIcon className="w-16 h-16 text-primary"/>
                        <div>
                            <h3 className="font-semibold text-lg">Drag and drop files</h3>
                            <p className="text-sm text-gray-500">or click to browse</p>
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={(e) => {
                                e.stopPropagation();
                                fileInputRef.current?.click();
                            }}
                        >
                            {document ? "Change File" : "Select File"}
                        </button>
                    </div>
                </div>

                {document && (
                    <div className="mt-8">
                        <div className="flex items-center gap-4 bg-base-200 p-4 rounded-lg">
                            <DocumentTextIcon className="w-8 h-8 text-primary"/>
                            <div className="flex-1">
                                <h3 className="font-medium">{document.name}</h3>
                                <p className="text-sm text-gray-500">
                                    {(document.size / 1024).toFixed(2)} KB - {document.type}
                                </p>
                            </div>
                            <button
                                className="btn btn-ghost btn-sm"
                                onClick={handleCancelUpload}
                            >
                                <XMarkIcon className="w-5 h-5"/>
                            </button>
                        </div>

                        <div className="mt-6 flex gap-4 justify-between">
                            <div className="flex gap-2">
                                <button
                                    className="btn btn-ghost"
                                    onClick={() => setShowPreview(true)}
                                >
                                    Anteprima
                                </button>
                                <button
                                    className="btn btn-ghost text-error"
                                    onClick={handleCancelUpload}
                                >
                                    Annulla
                                </button>
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={handleConfirmUpload}
                            >
                                Conferma Caricamento
                            </button>
                        </div>
                    </div>
                )}

                {showPreview && document && (
                    <FilePreview
                        file={document}
                        onClose={() => setShowPreview(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default DocumentUploader;