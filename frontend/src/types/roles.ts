import {ethers, JsonRpcSigner} from "ethers";
import {DocumentCertification__factory} from "../typechain-types";
import {contractAddress} from "../../config/config.ts";

export const ROLES = {
    ADMIN: ethers.ZeroHash,
    CERTIFIER: ethers.keccak256(ethers.toUtf8Bytes("CERTIFIER_ROLE")),
    BASE: "Base User"
};

export const hasRole = async (
    signer: JsonRpcSigner | null,
    role: string,
    address: string
): Promise<boolean> => {
    if (!signer || !address) return false;
    const contract = DocumentCertification__factory.connect(contractAddress, signer);
    return contract.hasRole(role, address);
};

export const hasCertifierRole = async (
    signer: JsonRpcSigner | null,
    address: string
): Promise<boolean> => {
    return hasRole(signer, ROLES.CERTIFIER, address);
};
