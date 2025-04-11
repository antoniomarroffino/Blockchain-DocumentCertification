'use client'

import React, {useRef, useState} from 'react';
import {DocumentArrowUpIcon, DocumentCheckIcon, ExclamationTriangleIcon} from '@heroicons/react/24/solid';
import {useUploadDocument} from "../hook/backend/useUploadDocument.ts";
import {useMetamask} from "../hook/useMetamask.ts";

const DocumentUploader: React.FC = () => {
    const [document, setDocument] = useState<File | null>(null);
    const [isCertified, setIsCertified] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {mutateAsync: uploadDocument} = useUploadDocument();
    const {signer} = useMetamask();

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        const allowedTypes = [
            'application/pdf',
            'image/jpeg',
            'image/png',
            'application/docx'
        ];

        if (file && allowedTypes.includes(file.type)) {
            setDocument(file);
            setIsCertified(false);
            await uploadDocument({
                title: file.name,
                ownerWallet: signer!.address,
            });
        } else {
            alert('Formato documento non supportato');
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <main className="p-4 bg-gray-100 flex-1 overflow-y-auto">
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <h2 className="text-2xl font-bold mb-4">Certificazione Documenti</h2>
                    <div
                        className="card w-96 bg-gradient-to-br from-primary/10 to-secondary/10 shadow-xl p-4 space-y-2">
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileUpload}
                            accept=".pdf,.jpg,.jpeg,.png,.docx"
                        />

                        {!document ? (
                            <div
                                onClick={triggerFileInput}
                                className="cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 flex flex-col items-center justify-center p-6 border-2 border-dashed border-primary/50 rounded-xl hover:border-primary/80 hover:bg-primary/5"
                            >
                                <DocumentArrowUpIcon className="h-16 w-16 text-primary/70 mb-4"/>
                                <h3 className="text-xl font-semibold text-center text-base-content/70">
                                    Carica Documento
                                </h3>
                                <p className="text-sm text-base-content/50 text-center mt-2">
                                    Supportati: PDF, JPEG, PNG, DOCX
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between bg-base-100 p-4 rounded-lg shadow-md">
                                    <div className="flex items-center space-x-3">
                                        {isCertified ? (
                                            <DocumentCheckIcon className="h-8 w-8 text-success"/>
                                        ) : (
                                            <ExclamationTriangleIcon className="h-8 w-8 text-warning"/>
                                        )}
                                        <div>
                                            <p className="font-semibold">{document.name}</p>
                                            <p className="text-sm text-base-content/50">
                                                {(document.size / 1024).toFixed(2)} KB
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={triggerFileInput}
                                        className="btn btn-ghost btn-sm"
                                    >
                                        Cambia
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DocumentUploader;