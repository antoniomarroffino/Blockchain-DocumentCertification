'use client'
import { DocumentTextIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

type FilePreviewProps = {
    file: Blob
    onClose: () => void
}

const FilePreview = ({ file, onClose }: FilePreviewProps) => {
    const [previewContent, setPreviewContent] = useState<string>('')

    useEffect(() => {
        const reader = new FileReader()
        console.log(file.type);
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-base-100 rounded-xl w-full max-w-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Anteprima documento</h3>
                    <button onClick={onClose} className="btn btn-ghost btn-sm">
                        ✕
                    </button>
                </div>

                <div className="max-h-[70vh] overflow-auto">
                    {file.type.startsWith('image/') ? (
                        <img
                            src={previewContent}
                            alt="Preview"
                            className="mx-auto max-h-[60vh] object-contain"
                        />
                    ) : file.type === 'application/pdf' ? (
                        <iframe
                            src={previewContent}
                            className="w-full h-[600px]"
                            title="PDF preview"
                        />
                    ) : (
                        <div className="text-center p-8">
                            <DocumentTextIcon className="w-16 h-16 text-primary mx-auto mb-4" />
                            <p className="text-gray-500">
                                Anteprima non disponibile per questo formato
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-4 text-sm text-gray-500">
                    <p>Dimensione: {(file.size / 1024).toFixed(2)} KB</p>
                </div>
            </div>
        </div>
    )
}

export default FilePreview