import {Document} from "@dti-isin/backend-api-client"
import CryptoJS from "crypto-js";
import {ethers} from "ethers";

export const calculateDocumentHash = async (document: Document) => {
    let baseString = document.title! + document.ownerWallet;

    if (document.content) {
        const buffer = await document.content.arrayBuffer();
        const fileWordArray = CryptoJS.lib.WordArray.create(buffer);
        const fileHex = fileWordArray.toString();
        baseString += fileHex;
    }
    const hash = CryptoJS.SHA256(baseString).toString();
    return ethers.hexlify(ethers.toUtf8Bytes(hash)).substring(0, 66);
};