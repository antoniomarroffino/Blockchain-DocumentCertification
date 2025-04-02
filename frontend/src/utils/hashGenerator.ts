import CryptoJS from 'crypto-js';

interface HashResult {
    hash: string;
    fileType: string;
    fileName: string;
    fileSize: number;
}

export const generateFileHash = (file: File): Promise<HashResult> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const wordArray = CryptoJS.lib.WordArray.create(event.target!.result as ArrayBuffer);
                const hash = CryptoJS.SHA256(wordArray);

                resolve({
                    hash: hash.toString(),
                    fileType: file.type,
                    fileName: file.name,
                    fileSize: file.size
                });
            } catch (error) {
                reject(new Error(`Errore generazione hash: ${error instanceof Error ? error.message : 'Errore sconosciuto'}`));
            }
        };

        reader.onerror = (error) => {
            reject(new Error(`Errore lettura file: ${error}`));
        };

        reader.readAsArrayBuffer(file);
    });
};

interface VerificationResult {
    isValid: boolean;
    currentHash?: string;
    originalHash?: string;
}

export const verifyDocumentIntegrity = (
    file: File,
    originalHash: string
): Promise<VerificationResult> => {
    return new Promise((resolve, reject) => {
        generateFileHash(file)
            .then(result => {
                const isIntact = result.hash === originalHash;
                resolve({
                    isValid: isIntact,
                    currentHash: result.hash,
                    originalHash: originalHash
                });
            })
            .catch(reject);
    });
};