import {ethers} from "ethers";
import {DocumentControllerApi} from "@dti-isin/backend-api-client"
import {DocumentCertification__factory} from "../src/typechain-types";

export const contractAddress = `0x5fbdb2315678afecb367f032d93f642f64180aa3`;
export const provider =  new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`);
export const documentCertificationContractNoTX = DocumentCertification__factory.connect(contractAddress, provider);

export const documentApi = new DocumentControllerApi();