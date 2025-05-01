'use client';

import {DocumentTextIcon} from "@heroicons/react/24/outline";
import {DocumentDTO} from "@dti-isin/backend-api-client";
import CertificationBadge from "./CertificationBadge";

interface Props {
    document: DocumentDTO;
    onPreview?: () => void;
}

const MyDocumentCard = ({document, onPreview}: Props) => {
    return (
        <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-4 shadow-sm space-y-2">
            <div className="flex items-center gap-3">
                <DocumentTextIcon className="w-6 h-6 text-yellow-400"/>
                <div>
                    <div className="font-bold text-white">{document.title}</div>
                    <div className="text-sm text-neutral-400">ID: {document.id}</div>
                </div>
            </div>

            <div className="text-sm text-neutral-400">
                {new Date(document.uploadTimestamp!).toLocaleDateString()}
            </div>

            <CertificationBadge docHash={document.hash!}/>

            <button
                onClick={onPreview}
                className="btn btn-sm btn-ghost text-yellow-400"
            >
                Preview
            </button>
        </div>
    );
};

export default MyDocumentCard;
