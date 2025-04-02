import React, { useState, useEffect } from 'react';

interface DocumentPreviewProps {
    document: File;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ document }) => {
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (document) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(document);
        }
    }, [document]);

    const renderPreview = () => {
        const fileType = document.type;

        switch(fileType) {
            case 'application/pdf':
                return (
                    <iframe
                        src={preview || ''}
                        width="100%"
                        height="300px"
                        title="PDF Preview"
                    />
                );
            case 'image/jpeg':
            case 'image/png':
                return (
                    <img
                        src={preview || ''}
                        alt="Document Preview"
                        className="max-h-64 object-contain"
                    />
                );
            default:
                return <p>Anteprima non disponibile</p>;
        }
    };

    return (
        <div className="document-preview mt-4">
            {preview && renderPreview()}
        </div>
    );
};

export default DocumentPreview;