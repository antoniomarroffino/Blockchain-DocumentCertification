'use client'

import {useState} from 'react';
import {DocumentArrowUpIcon} from '@heroicons/react/24/solid';
import {useUploadDocument} from "../hook/backend/useUploadDocument.ts";
import {useMetamask} from "../hook/useMetamask.ts";
import {DocumentTextIcon} from "@heroicons/react/24/outline";
import {ArrowRightIcon, LockClosedIcon} from "@heroicons/react/16/solid";

const DocumentUploader = () => {
    const { isConnected, signer } = useMetamask();
    const [document, setDocument] = useState<File | null>(null);
    const {mutateAsync: uploadDocument} = useUploadDocument();

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
            await uploadDocument({
                title: file.name,
                ownerWallet: signer!.address,
            });
        } else {
            alert('Formato documento non supportato');
        }
    };


    if (!isConnected) {
        return (
            <div className="hero min-h-[50vh]">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <LockClosedIcon className="w-12 h-12 text-primary mx-auto mb-4" />
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
                <div className="border-2 border-dashed border-base-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
                    <input
                        type="file"
                        className="hidden"
                        onChange={handleFileUpload}
                        accept=".pdf,.jpg,.jpeg,.png,.docx"
                    />
                    <div className="flex flex-col items-center gap-4">
                        <DocumentArrowUpIcon className="w-16 h-16 text-primary" />
                        <div>
                            <h3 className="font-semibold text-lg">Drag and drop files</h3>
                            <p className="text-sm text-gray-500">or click to browse</p>
                        </div>
                        <button className="btn btn-primary">Select File</button>
                    </div>
                </div>

                {document && (
                    <div className="mt-8">
                        <div className="flex items-center gap-4 bg-base-200 p-4 rounded-lg">
                            <DocumentTextIcon className="w-8 h-8 text-primary" />
                            <div className="flex-1">
                                <h3 className="font-medium">{document.name}</h3>
                                <p className="text-sm text-gray-500">
                                    {(document.size / 1024).toFixed(2)} KB - {document.type}
                                </p>
                            </div>
                            <button className="btn btn-ghost">Change</button>
                        </div>

                        <div className="mt-6">
                            <button className="btn btn-primary w-full">
                                Certify Document
                                <ArrowRightIcon className="w-4 h-4 ml-2" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DocumentUploader;