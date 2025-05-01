import { useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { DocumentCertification__factory } from "../../typechain-types";
import { useMetamask } from "../metamask/useMetamask";
import { ROLES } from "../../types/roles.ts";
import {contractAddress} from "../../../config/config.ts";

export const useManageCertifier = (onChange: () => void) => {
    const { signer } = useMetamask();
    const [loading, setLoading] = useState(false);

    const grant = async (address: string) => {
        if (!signer || !ethers.isAddress(address)) {
            toast.error("Invalid address");
            return;
        }

        const contract = DocumentCertification__factory.connect(contractAddress, signer);
        try {
            setLoading(true);
            const tx = await contract.grantRole(ROLES.CERTIFIER, address);
            await tx.wait();
            toast.success("Role granted successfully");
            onChange();
        } catch (err) {
            toast.error("Error while granting role");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const revoke = async (address: string) => {
        if (!signer) return;

        const contract = DocumentCertification__factory.connect(contractAddress, signer);
        try {
            setLoading(true);
            const tx = await contract.revokeRole(ROLES.CERTIFIER, address);
            await tx.wait();
            toast.success("Role revoked successfully");
            onChange();
        } catch (err) {
            toast.error("Error while revoking role");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { grant, revoke, loading };
};
