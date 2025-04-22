import {DocumentDTO} from "@dti-isin/backend-api-client"
import CryptoJS from "crypto-js";
import {ethers} from "ethers";

export interface CalculateDocumentHashPayload {
    document: DocumentDTO,
    documentContent: Blob,
}

export const calculateDocumentHash = async ({document, documentContent} : CalculateDocumentHashPayload) => {
    let baseString = document.title! + document.ownerWallet;

    if (documentContent) {
        const buffer = await documentContent.arrayBuffer();
        const fileWordArray = CryptoJS.lib.WordArray.create(buffer);
        const fileHex = fileWordArray.toString();
        baseString += fileHex;
    }
    const hash = CryptoJS.SHA256(baseString).toString();
    return ethers.hexlify(ethers.toUtf8Bytes(hash)).substring(0, 66);
};