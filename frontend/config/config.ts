import {ethers} from "ethers";
import {DocumentControllerApi} from "@dti-isin/backend-api-client"
import {DocumentCertification__factory} from "../src/typechain-types";

//export const contractAddress = `0xddB42F1B5162df879dFFfFf7cd575d3F358061E6`; // Proxy Address on Sepolia Network
export const contractAddress = `0x0165878A594ca255338adfa4d48449f69242Eb8F`; // Proxy Address on Localhost
//export const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`);
export const provider =  new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
export const documentCertificationContractNoTX = DocumentCertification__factory.connect(contractAddress, provider);

export const documentApi = new DocumentControllerApi();