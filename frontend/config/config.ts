import {ethers, Wallet} from "ethers";
import {DocumentControllerApi} from "@dti-isin/backend-api-client"
import {DocumentCertification__factory} from "../src/typechain-types";

export const contractAddress = `0x5fbdb2315678afecb367f032d93f642f64180aa3`;
export const provider =  new ethers.JsonRpcProvider('http://localhost:8545');
export const signer = new Wallet('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider);
export const documentCertificationContractNoTX = DocumentCertification__factory.connect(contractAddress, provider);
export const documentCertificationContractForTX = DocumentCertification__factory.connect(contractAddress, signer);

export const documentApi = new DocumentControllerApi();