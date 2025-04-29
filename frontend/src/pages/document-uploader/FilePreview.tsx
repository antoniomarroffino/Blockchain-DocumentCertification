'use client'

import { DocumentTextIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type FilePreviewProps = {
    file: Blob
    onClose: () => void
}

const FilePreview = ({ file, onClose }: FilePreviewProps) => {
    const [previewContent, setPreviewContent] = useState<string>('')

    useEffect(() => {
        const reader = new FileReader()
        if (file.type.startsWith('image/')) {
            reader.readAsDataURL(file)
            reader.onload = () => setPreviewContent(reader.result as string)
        } else if (file.type === 'application/pdf') {
            reader.readAsArrayBuffer(file)
            reader.onload = () => {
                const blob = new Blob([reader.result!], { type: 'application/pdf' })
                setPreviewContent(URL.createObjectURL(blob))
            }
        }
    }, [file])

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                    className="bg-neutral-800 text-white rounded-xl w-full max-w-2xl p-6 shadow-2xl"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">Document Preview</h3>
                        <button
                            onClick={onClose}
                            className="text-neutral-400 hover:text-yellow-400 transition text-xl font-bold"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="max-h-[70vh] overflow-auto rounded-lg bg-neutral-900 border border-neutral-700 p-4">
                        {file.type.startsWith('image/') ? (
                            <img
                                src={previewContent}
                                alt="Preview"
                                className="mx-auto max-h-[60vh] object-contain"
                            />
                        ) : file.type === 'application/pdf' ? (
                            <iframe
                                src={previewContent}
                                className="w-full h-[600px] rounded"
                                title="PDF preview"
                            />
                        ) : (
                            <div className="text-center p-8">
                                <DocumentTextIcon className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                                <p className="text-neutral-400">
                                    Preview not available for this file format.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 text-sm text-neutral-400 text-right">
                        Size: {(file.size / 1024).toFixed(2)} KB
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default FilePreview
