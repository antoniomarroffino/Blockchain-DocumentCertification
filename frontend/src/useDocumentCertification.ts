import { useState, useCallback } from 'react';
import {generateFileHash, verifyDocumentIntegrity} from "./utils/hashGenerator.ts";

interface CertificationMetadata {
    hash: string;
    timestamp: string;
    fileType: string;
    fileName: string;
}

export const useDocumentCertification = () => {
    const [documentHash, setDocumentHash] = useState<string | null>(null);
    const [isCertified, setIsCertified] = useState<boolean>(false);
    const [certificationMetadata, setCertificationMetadata] = useState<CertificationMetadata | null>(null);
    const [error, setError] = useState<string | null>(null);

    const certifyDocument = useCallback(async (file: File) => {
        try {
            const hashResult = await generateFileHash(file);

            setDocumentHash(hashResult.hash);
            setIsCertified(true);

            setCertificationMetadata({
                hash: hashResult.hash,
                timestamp: new Date().toISOString(),
                fileType: hashResult.fileType,
                fileName: hashResult.fileName
            });

            setError(null);

            return hashResult;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Errore sconosciuto';
            setError(errorMessage);
            setIsCertified(false);
            console.error('Errore certificazione:', err);

            return null;
        }
    }, []);

    const verifyDocument = useCallback(async (file: File, originalHash: string) => {
        try {
            const verificationResult = await verifyDocumentIntegrity(file, originalHash);

            return {
                isValid: verificationResult.isValid,
                details: verificationResult
            };
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Errore sconosciuto';
            setError(errorMessage);
            return {
                isValid: false,
                error: errorMessage
            };
        }
    }, []);

    const resetCertification = useCallback(() => {
        setDocumentHash(null);
        setIsCertified(false);
        setCertificationMetadata(null);
        setError(null);
    }, []);

    return {
        documentHash,
        isCertified,
        certificationMetadata,
        error,
        certifyDocument,
        verifyDocument,
        resetCertification
    };
};