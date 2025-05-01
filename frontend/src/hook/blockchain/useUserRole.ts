import {useEffect, useState} from "react";
import {ethers} from "ethers";
import {useMetamask} from "../metamask/useMetamask";
import {DocumentCertification__factory} from "../../typechain-types";
import {contractAddress} from "../../../config/config.ts";

export type UserRole = "Admin" | "Certifier" | "Base User" | "Unknown";

export const useUserRole = (): { role: UserRole; isLoading: boolean } => {
    const {signer} = useMetamask();
    const [role, setRole] = useState<UserRole>("Unknown");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkRoles = async () => {
            if (!signer) {
                setRole("Unknown");
                setIsLoading(false);
                return;
            }

            const contract = DocumentCertification__factory.connect(contractAddress, signer);
            const address = await signer.getAddress();

            const DEFAULT_ADMIN_ROLE = ethers.ZeroHash;
            const CERTIFIER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("CERTIFIER_ROLE"));

            try {
                const isAdmin = await contract.hasRole(DEFAULT_ADMIN_ROLE, address);
                if (isAdmin) {
                    setRole("Admin");
                } else {
                    const isCertifier = await contract.hasRole(CERTIFIER_ROLE, address);
                    setRole(isCertifier ? "Certifier" : "Base User");
                }
            } catch (err) {
                console.error("Error checking roles:", err);
                setRole("Unknown");
            } finally {
                setIsLoading(false);
            }
        };

        checkRoles();
    }, [signer]);

    return {role, isLoading};
};
