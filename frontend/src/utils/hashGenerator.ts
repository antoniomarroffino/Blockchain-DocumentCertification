import {Document} from "@dti-isin/backend-api-client"

export const calculateDocumentHash = async (document: Document) => {
    let baseString = document.title! + document.ownerWallet + document.uploadTimestamp;

    if (document.content) {
        const buffer = await document.content.arrayBuffer();
        const fileWordArray = CryptoJS.lib.WordArray.create(buffer);
        const fileHex = fileWordArray.toString();
        baseString += fileHex;
    }

    return CryptoJS.SHA256(baseString).toString();
};