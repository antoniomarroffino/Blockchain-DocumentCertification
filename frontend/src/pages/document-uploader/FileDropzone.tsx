'use client';

import { DocumentArrowUpIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import React from 'react';

interface FileDropzoneProps {
    onFileSelect: (file: File) => void;
    isDragging: boolean;
    onDragOver: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    currentFile: File | null;
    disabled?: boolean;
}

const FileDropzone = ({
                          onFileSelect,
                          isDragging,
                          onDragOver,
                          onDragLeave,
                          onDrop,
                          fileInputRef,
                          currentFile,
                          disabled = false
                      }: FileDropzoneProps) => {
    const handleClick = () => {
        if (!disabled) {
            fileInputRef.current?.click();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        const file = e.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };

    return (
        <motion.div
            whileHover={!disabled ? { scale: 1.01 } : {}}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
                disabled
                    ? 'border-neutral-700 bg-neutral-900 opacity-50 cursor-not-allowed'
                    : isDragging
                        ? 'border-yellow-400 bg-yellow-400/10'
                        : 'border-neutral-600'
            }`}
            onDragOver={(e) => {
                if (!disabled) onDragOver(e);
            }}
            onDragLeave={(e) => {
                if (!disabled) onDragLeave(e);
            }}
            onDrop={(e) => {
                if (!disabled) onDrop(e);
            }}
            onClick={handleClick}
        >
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleInputChange}
                accept=".pdf,.jpg,.jpeg,.png,.docx"
                disabled={disabled}
            />

            {disabled ? (
                <p className="text-neutral-400 text-sm italic">
                    You already selected a file. Confirm or cancel before selecting a new one.
                </p>
            ) : (
                <div className="flex flex-col items-center gap-4">
                    <DocumentArrowUpIcon className="w-16 h-16 text-yellow-400" />
                    <div>
                        <h3 className="font-semibold text-lg text-white">Drag and drop files</h3>
                        <p className="text-sm text-neutral-400">or click to browse</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="btn bg-yellow-400 text-neutral-900 font-bold rounded-full px-6 py-2 hover:shadow-yellow-400/30 transition"
                    >
                        {currentFile ? 'Change File' : 'Select File'}
                    </motion.button>
                </div>
            )}
        </motion.div>
    );
};

export default FileDropzone;
