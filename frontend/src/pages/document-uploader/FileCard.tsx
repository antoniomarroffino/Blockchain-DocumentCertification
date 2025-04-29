'use client'

import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/16/solid';

interface FileCardProps {
    file: File;
    onCancel: () => void;
}

const FileCard = ({ file, onCancel }: FileCardProps) => {
    return (
        <div className="flex items-center gap-4 bg-neutral-700 p-4 rounded-lg">
            <DocumentTextIcon className="w-8 h-8 text-yellow-400" />
            <div className="flex-1">
                <h3 className="font-medium text-white">{file.name}</h3>
                <p className="text-sm text-neutral-400">
                    {(file.size / 1024).toFixed(2)} KB - {file.type}
                </p>
            </div>
            <button
                className="btn btn-ghost btn-sm text-red-400"
                onClick={onCancel}
            >
                <XMarkIcon className="w-5 h-5" />
            </button>
        </div>
    );
};

export default FileCard;
