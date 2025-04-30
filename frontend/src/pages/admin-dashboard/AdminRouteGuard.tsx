import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useMetamask } from "../../hook/metamask/useMetamask";
import { DocumentCertification__factory } from "../../typechain-types";
import { ethers } from "ethers";
import {contractAddress, provider} from "../../../config/config.ts";
import LoadingOverlay from "../../components/common/LoadingOverlay.tsx";

interface Props {
    children: React.ReactNode;
}

const AdminRouteGuard = ({ children }: Props) => {
    const { signer } = useMetamask();
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAdminRole = async () => {
            if (!signer) {
                setIsAdmin(false);
                return;
            }

            const contract = DocumentCertification__factory.connect(contractAddress, provider);
            const DEFAULT_ADMIN_ROLE = ethers.keccak256(ethers.toUtf8Bytes("DEFAULT_ADMIN_ROLE"));

            try {
                const hasRole = await contract.hasRole(DEFAULT_ADMIN_ROLE, await signer.getAddress());
                setIsAdmin(hasRole);
            } catch (err) {
                console.error("Error verifying admin role:", err);
                setIsAdmin(false);
            }
        };

        checkAdminRole();
    }, [signer]);

    if (isAdmin === null) return <LoadingOverlay message="Checking admin permissions..." />;

    return isAdmin ? <>{children}</> : <Navigate to="/" replace />;
};

export default AdminRouteGuard;
