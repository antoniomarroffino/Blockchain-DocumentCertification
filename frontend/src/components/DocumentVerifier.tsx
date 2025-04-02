import React from 'react';
import { DocumentCheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface DocumentVerifierProps {
    document: File;
    isCertified: boolean;
}

const DocumentVerifier: React.FC<DocumentVerifierProps> = ({
                                                               document,
                                                               isCertified
                                                           }) => {
    return (
        <div className="flex items-center justify-between space-x-2 text-sm">
            <span className="truncate max-w-[200px]">{document.name}</span>
            {isCertified ? (
                <div className="tooltip tooltip-success" data-tip="Documento Certificato">
                    <DocumentCheckIcon className="h-5 w-5 text-green-500" />
                </div>
            ) : (
                <div className="tooltip tooltip-error" data-tip="Documento Non Certificato">
                    <XMarkIcon className="h-5 w-5 text-red-500" />
                </div>
            )}
        </div>
    );
};

export default DocumentVerifier;