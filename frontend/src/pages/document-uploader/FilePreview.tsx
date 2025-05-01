'use client'

import {DocumentTextIcon} from '@heroicons/react/24/outline'
import {useEffect, useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion'

type FilePreviewProps = {
    file: Blob & { name?: string }
    onClose: () => void
}

const FilePreview = ({file, onClose}: FilePreviewProps) => {
    const [previewContent, setPreviewContent] = useState<string>('')

    useEffect(() => {
        const reader = new FileReader()

        const isImage =
            file.type.startsWith('image/') ||
            file.name?.match(/\.(png|jpg|jpeg|gif|webp)$/i)

        const isPdf =
            file.type === 'application/pdf' ||
            file.name?.toLowerCase().endsWith('.pdf')

        if (isImage) {
            reader.readAsDataURL(file)
            reader.onload = () => setPreviewContent(reader.result as string)
        } else if (isPdf) {
            reader.readAsArrayBuffer(file)
            reader.onload = () => {
                const blob = new Blob([reader.result!], {type: 'application/pdf'})
                setPreviewContent(URL.createObjectURL(blob))
            }
        }
    }, [file])

    return (
        <AnimatePresence>
            <motion.div
                className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                <motion.div
                    initial={{scale: 0.95, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    exit={{scale: 0.95, opacity: 0}}
                    transition={{type: 'spring', damping: 20, stiffness: 200}}
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
                        {previewContent && file.type.startsWith('image/') ? (
                            <img
                                src={previewContent}
                                alt="Preview"
                                className="mx-auto max-h-[60vh] object-contain"
                            />
                        ) : previewContent && file.type === 'application/pdf' ? (
                            <iframe
                                src={previewContent}
                                className="w-full h-[600px] rounded"
                                title="PDF preview"
                            />
                        ) : previewContent ? (
                            <div className="text-center p-8">
                                <DocumentTextIcon className="w-16 h-16 text-yellow-400 mx-auto mb-4"/>
                                <p className="text-neutral-400">
                                    Preview not available for this file format.
                                </p>
                            </div>
                        ) : (
                            <p className="text-neutral-400 text-center">Loading preview...</p>
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
