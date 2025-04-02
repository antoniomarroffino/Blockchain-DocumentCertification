import {ethers} from "ethers";
import {DocumentControllerApi} from "@dti-isin/backend-api-client"

export const contractAddress = `0x5fbdb2315678afecb367f032d93f642f64180aa3`;
export const provider =  new ethers.JsonRpcProvider('http://localhost:8545');

export const documentApi = new DocumentControllerApi();