import {keccak256, toUtf8Bytes} from "ethers";

export interface CalculateDocumentHashPayload {
    title: string;
    ownerWallet: string;
    documentContent: Blob;
}

export const calculateDocumentHash = async ({ title, ownerWallet, documentContent }: CalculateDocumentHashPayload) => {
    const buffer = await documentContent.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);

    const fileHex = Array.from(uint8Array)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

    const baseString = title + ownerWallet + fileHex;
    return keccak256(toUtf8Bytes(baseString));
};
